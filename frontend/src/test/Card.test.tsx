import { render, screen } from '@testing-library/react'
import Card, { CardTitle } from '../components/ui/Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card><p>Content</p></Card>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Card className="custom">Content</Card>)
    expect(screen.getByText('Content').className).toContain('custom')
  })
})

describe('CardTitle', () => {
  it('renders title text', () => {
    render(<CardTitle>Title</CardTitle>)
    expect(screen.getByText('Title')).toBeInTheDocument()
  })
})
