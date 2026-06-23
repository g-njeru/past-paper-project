import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AccessibilityProvider } from '../hooks/useAccessibility'
import A11yPanel from '../components/a11y/A11yPanel'

function renderWithProvider() {
  return render(
    <AccessibilityProvider>
      <A11yPanel />
    </AccessibilityProvider>,
  )
}

describe('A11yPanel', () => {
  it('renders the heading', () => {
    renderWithProvider()
    expect(screen.getByText('Accessibility Settings')).toBeInTheDocument()
  })

  it('renders all toggle controls', () => {
    renderWithProvider()
    expect(screen.getByRole('switch', { name: /line height/i })).toBeInTheDocument()
    expect(screen.getByRole('switch', { name: /letter spacing/i })).toBeInTheDocument()
    expect(screen.getByRole('switch', { name: /dyslexia font/i })).toBeInTheDocument()
    expect(screen.getByRole('switch', { name: /high contrast/i })).toBeInTheDocument()
    expect(screen.getByRole('switch', { name: /dark mode/i })).toBeInTheDocument()
    expect(screen.getByRole('switch', { name: /reduce motion/i })).toBeInTheDocument()
    expect(screen.getByRole('switch', { name: /focus outlines/i })).toBeInTheDocument()
  })

  it('renders text scale buttons', () => {
    renderWithProvider()
    expect(screen.getByRole('button', { name: /100%/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /125%/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /150%/i })).toBeInTheDocument()
  })

  it('renders reset button', () => {
    renderWithProvider()
    expect(screen.getByRole('button', { name: /reset all/i })).toBeInTheDocument()
  })

  it('toggles high contrast on click', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    const toggle = screen.getByRole('switch', { name: /high contrast/i })
    expect(toggle).toHaveAttribute('aria-checked', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-checked', 'true')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-checked', 'false')
  })

  it('selecting text scale updates aria-pressed', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    const btn125 = screen.getByRole('button', { name: /125%/i })
    const btn150 = screen.getByRole('button', { name: /150%/i })
    await user.click(btn125)
    expect(btn125).toHaveAttribute('aria-pressed', 'true')
    expect(btn150).toHaveAttribute('aria-pressed', 'false')
    await user.click(btn150)
    expect(btn150).toHaveAttribute('aria-pressed', 'true')
    expect(btn125).toHaveAttribute('aria-pressed', 'false')
  })

  it('reset all restores defaults', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    await user.click(screen.getByRole('switch', { name: /high contrast/i }))
    await user.click(screen.getByRole('switch', { name: /dark mode/i }))
    await user.click(screen.getByRole('button', { name: /reset all/i }))
    expect(screen.getByRole('switch', { name: /high contrast/i })).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByRole('switch', { name: /dark mode/i })).toHaveAttribute('aria-checked', 'false')
  })
})
