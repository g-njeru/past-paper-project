import { useLocation } from 'react-router-dom'
import { useFocusReset } from '../hooks/useFocusReset'
import Button from '../components/ui/Button'

export default function NotFound() {
  const { pathname } = useLocation()
  const headingRef = useFocusReset('/not-found')

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1
        ref={headingRef}
        id="page-heading"
        tabIndex={-1}
        className="text-2xl font-bold text-gray-900 focus:outline-none"
      >
        Page not found
      </h1>
      <p className="mt-2 text-gray-600">
        The page <span className="font-mono text-sm text-gray-500">{pathname}</span> does not exist.
      </p>
      <Button
        variant="primary"
        className="mt-6"
        onClick={() => {
          window.location.href = '/'
        }}
      >
        Go to Dashboard
      </Button>
    </div>
  )
}
