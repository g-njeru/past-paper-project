import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useFocusReset } from '../hooks/useFocusReset'
import Card, { CardTitle } from '../components/ui/Card'

interface Stats {
  papers: number
  questions: number
  topics: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ papers: 0, questions: 0, topics: 0 })
  const [loading, setLoading] = useState(true)
  const headingRef = useFocusReset('/')

  useEffect(() => {
    async function fetchStats() {
      const [papersRes, questionsRes, topicsRes] = await Promise.all([
        supabase.from('papers').select('*', { count: 'exact', head: true }),
        supabase.from('questions').select('*', { count: 'exact', head: true }),
        supabase.from('topics').select('*', { count: 'exact', head: true }),
      ])
      setStats({
        papers: papersRes.count ?? 0,
        questions: questionsRes.count ?? 0,
        topics: topicsRes.count ?? 0,
      })
      setLoading(false)
    }
    fetchStats()
  }, [])

  const statItems = [
    { label: 'Past Papers', value: stats.papers, desc: 'Uploaded papers' },
    { label: 'Questions', value: stats.questions, desc: 'Extracted questions' },
    { label: 'Topics', value: stats.topics, desc: 'CPA syllabus topics' },
    { label: 'Studied', value: '0', desc: 'Topics completed' },
  ]

  return (
    <div>
      <h1
        ref={headingRef}
        id="page-heading"
        tabIndex={-1}
        className="text-2xl font-bold text-gray-900 focus:outline-none"
      >
        Dashboard
      </h1>
      <p className="mt-2 text-gray-600">
        Welcome to your CPA revision companion. Upload past papers, track your
        syllabus progress, and practice questions from topics you have studied.
      </p>

      <div
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        role="list"
        aria-label="Your revision statistics"
      >
        {statItems.map((stat) => (
          <Card key={stat.label} role="listitem">
            <CardTitle>{loading ? '...' : stat.value}</CardTitle>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {stat.label}
            </p>
            <p className="text-sm text-gray-500">{stat.desc}</p>
          </Card>
        ))}
      </div>

      <section aria-labelledby="quick-actions-heading" className="mt-8">
        <h2
          id="quick-actions-heading"
          className="text-lg font-semibold text-gray-900"
        >
          Quick Actions
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardTitle>Upload a Past Paper</CardTitle>
            <p className="mt-1 text-sm text-gray-500">
              Add a PDF past paper to build your question bank.
            </p>
          </Card>
          <Card>
            <CardTitle>Review Questions</CardTitle>
            <p className="mt-1 text-sm text-gray-500">
              Practice questions from topics you have studied.
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}
