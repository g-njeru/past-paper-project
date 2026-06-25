-- ============================================================
-- CPA Revision App - Database Migration
-- Run this in Supabase SQL Editor (one time)
-- ============================================================

-- 1. Whitelist table (phone numbers allowed to sign up)
CREATE TABLE whitelist (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Profiles table (linked to auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  display_name TEXT DEFAULT 'Student',
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Papers table
CREATE TABLE papers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  subject_code TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  year INTEGER NOT NULL,
  exam_session TEXT NOT NULL,  -- e.g. 'January', 'June', 'December'
  title TEXT NOT NULL,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Topics table (sub-topics within a paper)
CREATE TABLE topics (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  paper_id BIGINT REFERENCES papers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Questions table
CREATE TABLE questions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  paper_id BIGINT REFERENCES papers(id) ON DELETE CASCADE,
  topic_id BIGINT REFERENCES topics(id) ON DELETE SET NULL,
  question_number TEXT NOT NULL,
  question_text TEXT NOT NULL,
  marks INTEGER,
  answer_text TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Enable Row Level Security
ALTER TABLE whitelist ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies

-- Whitelist: only admins can read/add/remove
CREATE POLICY "Admins can read whitelist"
  ON whitelist FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can insert whitelist"
  ON whitelist FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can delete whitelist"
  ON whitelist FOR DELETE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- Profiles: users can read own, admins can read all
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- Papers, topics, questions: any authenticated user can read
CREATE POLICY "Authenticated users can read papers"
  ON papers FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read topics"
  ON topics FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read questions"
  ON questions FOR SELECT
  USING (auth.role() = 'authenticated');

-- 8. Trigger: on signup, check whitelist and create profile
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  user_phone TEXT;
BEGIN
  user_phone := COALESCE(NEW.phone, NEW.raw_user_meta_data->>'phone');

  IF user_phone IS NULL THEN
    RAISE EXCEPTION 'No phone number provided' USING ERRCODE = '45000';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM whitelist WHERE phone = user_phone) THEN
    RAISE EXCEPTION 'Phone number is not whitelisted. Contact your administrator.' USING ERRCODE = '45000';
  END IF;

  INSERT INTO public.profiles (id, phone, display_name, is_admin)
  VALUES (
    NEW.id,
    user_phone,
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'Student'),
    false
  );

  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
