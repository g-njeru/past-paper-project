import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { AccessibilityProvider } from '../hooks/useAccessibility'
import App from '../App'

const mockUser = { id: 'test-user', phone: '+254700000000', aud: 'authenticated', role: 'authenticated', email: '', app_metadata: {}, user_metadata: {}, created_at: '', confirmed_at: '', last_sign_in_at: '', identities: [] }

vi.mock('../hooks/useAuth', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({
    user: mockUser,
    profile: { id: 'test-user', phone: '+254700000000', display_name: 'Test', is_admin: false, created_at: '' },
    loading: false,
    signIn: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    refreshProfile: vi.fn(),
  }),
}))

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
