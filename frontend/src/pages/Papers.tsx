import { useFocusReset } from '../hooks/useFocusReset'
import Card, { CardTitle } from '../components/ui/Card'

const subjects = [
  { code: 'CA10', name: 'Financial Accounting' },
  { code: 'CA11', name: 'Communicative Skills' },
  { code: 'CA12', name: 'Entrepreneurship and Communication' },
  { code: 'CA13', name: 'Business Law' },
  { code: 'CA14', name: 'Economics' },
  { code: 'CA15', name: 'Business Mathematics and Statistics' },
  { code: 'CA16', name: 'Information Communication Technology' },
]

export default function Papers() {
  const headingRef = useFocusReset('/papers')

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
        Upload and manage your KASNEB CPA past paper PDFs.
      </p>

      <section aria-labelledby="subjects-heading" className="mt-8">
        <h2
          id="subjects-heading"
          className="text-lg font-semibold text-gray-900"
        >
          Subjects
        </h2>
        <div
          className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="CPA foundation subjects"
        >
          {subjects.map((subject) => (
            <Card key={subject.code} role="listitem">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {subject.code}
              </p>
              <CardTitle className="mt-1">{subject.name}</CardTitle>
              <p className="mt-2 text-sm text-gray-500">
                No papers uploaded yet.
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
