import { useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import * as Toggle from '@radix-ui/react-toggle'
import { useFocusReset } from '../hooks/useFocusReset'
import Card, { CardTitle } from '../components/ui/Card'

const placeholderTopics = [
  {
    subject: 'CA10 - Financial Accounting',
    topics: [
      'Accounting concepts and conventions',
      'The accounting cycle',
      'Preparation of financial statements',
      'Partnership accounts',
      'Company accounts',
    ],
  },
  {
    subject: 'CA11 - Communicative Skills',
    topics: [
      'Communication theory',
      'Business writing',
      'Oral communication',
      'Reading comprehension',
    ],
  },
  {
    subject: 'CA12 - Entrepreneurship and Communication',
    topics: [
      'Entrepreneurship concepts',
      'Business opportunity identification',
      'Business planning',
      'Business growth strategies',
    ],
  },
  {
    subject: 'CA13 - Business Law',
    topics: [
      'Law of contract',
      'Law of tort',
      'Law of agency',
      'Sale of goods',
    ],
  },
  {
    subject: 'CA14 - Economics',
    topics: [
      'Demand and supply',
      'Market structures',
      'National income',
      'Money and banking',
    ],
  },
  {
    subject: 'CA15 - Business Mathematics and Statistics',
    topics: [
      'Algebra and functions',
      'Linear programming',
      'Probability',
      'Descriptive statistics',
    ],
  },
  {
    subject: 'CA16 - Information Communication Technology',
    topics: [
      'Computer hardware and software',
      'Networks and internet',
      'Database management',
      'ICT in business',
    ],
  },
]

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

export default function Topics() {
  const headingRef = useFocusReset('/topics')

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

      <div className="mt-8 space-y-4" role="list" aria-label="Subjects and topics">
        {placeholderTopics.map((group) => (
          <Collapsible.Root key={group.subject} asChild>
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
                  <TopicItem key={topic} name={topic} />
                ))}
              </Collapsible.Content>
            </Card>
          </Collapsible.Root>
        ))}
      </div>
    </div>
  )
}
