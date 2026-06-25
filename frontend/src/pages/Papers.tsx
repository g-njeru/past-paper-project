import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Paper } from '../types/database'
import { useFocusReset } from '../hooks/useFocusReset'
import Card, { CardTitle } from '../components/ui/Card'

interface SubjectGroup {
  code: string
  name: string
  papers: Paper[]
}

const defaultSubjects = [
  { code: 'CA10', name: 'Financial Accounting' },
  { code: 'CA11', name: 'Communicative Skills' },
  { code: 'CA12', name: 'Entrepreneurship and Communication' },
  { code: 'CA13', name: 'Business Law' },
  { code: 'CA14', name: 'Economics' },
  { code: 'CA15', name: 'Business Mathematics and Statistics' },
  { code: 'CA16', name: 'Information Communication Technology' },
]

export default function Papers() {
  const [groups, setGroups] = useState<SubjectGroup[]>([])
  const [loading, setLoading] = useState(true)
  const headingRef = useFocusReset('/papers')

  useEffect(() => {
    async function fetchPapers() {
      const { data } = await supabase
        .from('papers')
        .select('*')
        .order('year', { ascending: false })

      const grouped = defaultSubjects.map((subj) => ({
        ...subj,
        papers: (data ?? []).filter((p) => p.subject_code === subj.code),
      }))
      setGroups(grouped)
      setLoading(false)
    }
    fetchPapers()
  }, [])

  return (
    <div>
      <h1
        ref={headingRef}
        id="page-heading"
        tabIndex={-1}
        className="text-2xl font-bold text-gray-900 focus:outline-none"
      >
        Past Papers
      </h1>
      <p className="mt-2 text-gray-600">
        Browse available KASNEB CPA past papers.
      </p>

      <section aria-labelledby="subjects-heading" className="mt-8">
        <h2
          id="subjects-heading"
          className="text-lg font-semibold text-gray-900"
        >
          Subjects
        </h2>
        {loading ? (
          <p className="mt-4 text-gray-500">Loading...</p>
        ) : (
          <div
            className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="CPA foundation subjects"
          >
            {groups.map((group) => (
              <Card key={group.code} role="listitem">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {group.code}
                </p>
                <CardTitle className="mt-1">{group.name}</CardTitle>
                {group.papers.length === 0 ? (
                  <p className="mt-2 text-sm text-gray-500">
                    No papers uploaded yet.
                  </p>
                ) : (
                  <ul className="mt-2 space-y-1">
                    {group.papers.map((paper) => (
                      <li key={paper.id} className="text-sm text-gray-700">
                        {paper.title}{' '}
                        <span className="text-xs text-gray-400">
                          ({paper.exam_session} {paper.year})
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
