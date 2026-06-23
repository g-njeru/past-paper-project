import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AccessibilityProvider } from '../hooks/useAccessibility'
import { A11yToggle } from '../components/a11y/A11yToggle'

function renderWithProvider() {
  return render(
    <AccessibilityProvider>
      <A11yToggle />
    </AccessibilityProvider>,
  )
}

describe('A11yToggle', () => {
  it('renders the toggle button with accessible label', () => {
    renderWithProvider()
    expect(screen.getByRole('button', { name: /accessibility/i })).toBeInTheDocument()
  })

  it('opens the panel when clicked', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    const button = screen.getByRole('button', { name: /accessibility/i })
    await user.click(button)
    expect(screen.getByText(/text size/i)).toBeInTheDocument()
  })
})
