import { useState, useEffect } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import * as Toggle from '@radix-ui/react-toggle'
import { supabase } from '../lib/supabase'
import type { Topic, Paper } from '../types/database'
import { useFocusReset } from '../hooks/useFocusReset'
import Card, { CardTitle } from '../components/ui/Card'

interface TopicGroup {
  subject: string
  subjectCode: string
  topics: Topic[]
}

export default function Topics() {
  const [groups, setGroups] = useState<TopicGroup[]>([])
  const [loading, setLoading] = useState(true)
  const headingRef = useFocusReset('/topics')

  useEffect(() => {
    async function fetchTopics() {
      const [papersRes, topicsRes] = await Promise.all([
        supabase.from('papers').select('*'),
        supabase.from('topics').select('*').order('order_index'),
      ])
      const papers = papersRes.data ?? []
      const topics = topicsRes.data ?? []

      const grouped = papers.map((paper: Paper) => ({
        subject: `${paper.subject_code} - ${paper.subject_name}`,
        subjectCode: paper.subject_code,
        topics: topics.filter((t: Topic) => t.paper_id === paper.id),
      })).filter((g) => g.topics.length > 0)

      if (grouped.length === 0) {
        setGroups([])
      } else {
        setGroups(grouped)
      }
      setLoading(false)
    }
    fetchTopics()
  }, [])

  return (
    <div>
      <h1
        ref={headingRef}
        id="page-heading"
        tabIndex={-1}
        className="text-2xl font-bold text-gray-900 focus:outline-none"
      >
        Syllabus Topics
      </h1>
      <p className="mt-2 text-gray-600">
        Track your study progress across the CPA foundation syllabus. Mark
        topics as studied to filter relevant past paper questions.
      </p>

      {loading ? (
        <p className="mt-8 text-gray-500">Loading...</p>
      ) : groups.length === 0 ? (
        <p className="mt-8 text-gray-500">No topics available yet. Seed some papers and topics first.</p>
      ) : (
        <div className="mt-8 space-y-4" role="list" aria-label="Subjects and topics">
          {groups.map((group) => (
            <Collapsible.Root key={group.subjectCode} asChild>
              <Card role="listitem">
                <Collapsible.Trigger className="flex w-full items-center justify-between text-left">
                  <CardTitle>{group.subject}</CardTitle>
                  <svg
                    className="h-5 w-5 text-gray-400 transition-transform data-[state=open]:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Collapsible.Trigger>

                <Collapsible.Content className="mt-4 space-y-1">
                  {group.topics.map((topic) => (
                    <TopicItem key={topic.id} name={topic.name} />
                  ))}
                </Collapsible.Content>
              </Card>
            </Collapsible.Root>
          ))}
        </div>
      )}
    </div>
  )
}

function TopicItem({ name }: { name: string }) {
  const [pressed, setPressed] = useState(false)

  return (
    <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50">
      <span className="text-sm text-gray-700">{name}</span>
      <Toggle.Root
        pressed={pressed}
        onPressedChange={setPressed}
        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
          pressed
            ? 'bg-green-50 text-studied'
            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
        }`}
        aria-label={`Mark "${name}" as ${pressed ? 'not studied' : 'studied'}`}
      >
        {pressed ? 'Studied' : 'Pending'}
      </Toggle.Root>
    </div>
  )
}
