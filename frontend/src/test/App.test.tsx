import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AccessibilityProvider } from '../hooks/useAccessibility'
import App from '../App'

function renderApp(initialEntries: string[] = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AccessibilityProvider>
        <App />
      </AccessibilityProvider>
    </MemoryRouter>,
  )
}

describe('App routing', () => {
  it('renders dashboard on /', () => {
    renderApp(['/'])
    expect(screen.getByRole('heading', { level: 1, name: /dashboard/i })).toBeInTheDocument()
  })

  it('renders papers on /papers', () => {
    renderApp(['/papers'])
    expect(screen.getByRole('heading', { level: 1, name: /past papers/i })).toBeInTheDocument()
  })

  it('renders topics on /topics', () => {
    renderApp(['/topics'])
    expect(screen.getByRole('heading', { level: 1, name: /syllabus topics/i })).toBeInTheDocument()
  })

  it('renders questions on /questions', () => {
    renderApp(['/questions'])
    expect(screen.getByRole('heading', { level: 1, name: /questions/i })).toBeInTheDocument()
  })

  it('renders 404 for unknown routes', () => {
    renderApp(['/unknown'])
    expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument()
  })
})
