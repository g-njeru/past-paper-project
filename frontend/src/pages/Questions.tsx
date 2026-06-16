import { useFocusReset } from '../hooks/useFocusReset'
import Card, { CardTitle } from '../components/ui/Card'

export default function Questions() {
  const headingRef = useFocusReset('/questions')

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
        Browse and practice past paper questions filtered by topics you have
        studied.
      </p>

      <section aria-labelledby="filters-heading" className="mt-8">
        <h2
          id="filters-heading"
          className="sr-only"
        >
          Filters
        </h2>
        <Card>
          <div className="flex flex-wrap gap-4">
            <div>
              <label
                htmlFor="subject-filter"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <select
                id="subject-filter"
                className="mt-1 block w-48 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All subjects</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="year-filter"
                className="block text-sm font-medium text-gray-700"
              >
                Year
              </label>
              <select
                id="year-filter"
                className="mt-1 block w-32 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All years</option>
              </select>
            </div>
          </div>
        </Card>
      </section>

      <section
        aria-label="Question list"
        className="mt-6"
      >
        <div
          className="grid gap-4 sm:grid-cols-2"
          role="list"
          aria-label="Filtered questions"
        >
          <Card role="listitem">
            <CardTitle>No questions yet</CardTitle>
            <p className="mt-1 text-sm text-gray-500">
              Upload past papers and mark topics as studied to see relevant
              questions here.
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}
