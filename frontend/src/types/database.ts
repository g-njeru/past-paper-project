export interface WhitelistEntry {
  id: number
  phone: string
  created_at: string
}

export interface Profile {
  id: string
  phone: string
  display_name: string
  is_admin: boolean
  created_at: string
}

export interface Paper {
  id: number
  subject_code: string
  subject_name: string
  year: number
  exam_session: string
  title: string
  pdf_url: string | null
  created_at: string
}

export interface Topic {
  id: number
  paper_id: number
  name: string
  description: string | null
  order_index: number
  created_at: string
}

export interface Question {
  id: number
  paper_id: number
  topic_id: number | null
  question_number: string
  question_text: string
  marks: number | null
  answer_text: string | null
  created_at: string
}
