import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Paper, Question } from '../types/database'
import { useFocusReset } from '../hooks/useFocusReset'
import Card, { CardTitle } from '../components/ui/Card'

interface FilterOption {
  value: string
  label: string
}

export default function Questions() {
  const [papers, setPapers] = useState<Paper[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [loading, setLoading] = useState(true)
  const headingRef = useFocusReset('/questions')

  const subjects: FilterOption[] = [
    { value: '', label: 'All subjects' },
    ...[...new Set(papers.map((p) => p.subject_code))].map((code) => {
      const paper = papers.find((p) => p.subject_code === code)
      return { value: code, label: `${code} - ${paper?.subject_name ?? code}` }
    }),
  ]

  const years: FilterOption[] = [
    { value: '', label: 'All years' },
    ...[...new Set(papers.map((p) => p.year))].sort().reverse().map((y) => ({
      value: String(y),
      label: String(y),
    })),
  ]

  const filteredQuestions = questions.filter((q) => {
    const paper = papers.find((p) => p.id === q.paper_id)
    if (selectedSubject && paper?.subject_code !== selectedSubject) return false
    if (selectedYear && paper?.year !== Number(selectedYear)) return false
    return true
  })

  useEffect(() => {
    async function fetchData() {
      const [papersRes, questionsRes] = await Promise.all([
        supabase.from('papers').select('*').order('year', { ascending: false }),
        supabase.from('questions').select('*'),
      ])
      setPapers(papersRes.data ?? [])
      setQuestions(questionsRes.data ?? [])
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1
        ref={headingRef}
        id="page-heading"
        tabIndex={-1}
        className="text-2xl font-bold text-gray-900 focus:outline-none"
      >
        Questions
      </h1>
      <p className="mt-2 text-gray-600">
        Browse and practice past paper questions filtered by topics you have studied.
      </p>

      <section aria-labelledby="filters-heading" className="mt-8">
        <h2 id="filters-heading" className="sr-only">Filters</h2>
        <Card>
          <div className="flex flex-wrap gap-4">
            <div>
              <label htmlFor="subject-filter" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <select
                id="subject-filter"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="mt-1 block w-48 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {subjects.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <select
                id="year-filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="mt-1 block w-32 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {years.map((y) => (
                  <option key={y.value} value={y.value}>{y.label}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </section>

      <section aria-label="Question list" className="mt-6">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filteredQuestions.length === 0 ? (
          <div className="grid gap-4 sm:grid-cols-2" role="list" aria-label="Filtered questions">
            <Card role="listitem">
              <CardTitle>No questions yet</CardTitle>
              <p className="mt-1 text-sm text-gray-500">
                Upload past papers and mark topics as studied to see relevant questions here.
              </p>
            </Card>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2" role="list" aria-label="Filtered questions">
            {filteredQuestions.map((q) => {
              const paper = papers.find((p) => p.id === q.paper_id)
              return (
                <Card key={q.id} role="listitem">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {paper?.subject_code} - Q{q.question_number}
                    {q.marks && <span className="ml-2 text-gray-400">({q.marks} marks)</span>}
                  </p>
                  <p className="mt-2 text-sm text-gray-900">{q.question_text}</p>
                  {paper && (
                    <p className="mt-2 text-xs text-gray-400">
                      {paper.subject_name} &middot; {paper.exam_session} {paper.year}
                    </p>
                  )}
                </Card>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
