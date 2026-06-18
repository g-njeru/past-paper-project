import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('App routing', () => {
  it('renders dashboard on /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /dashboard/i })).toBeInTheDocument()
  })

  it('renders papers on /papers', () => {
    render(
      <MemoryRouter initialEntries={['/papers']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /past papers/i })).toBeInTheDocument()
  })

  it('renders topics on /topics', () => {
    render(
      <MemoryRouter initialEntries={['/topics']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /syllabus topics/i })).toBeInTheDocument()
  })

  it('renders questions on /questions', () => {
    render(
      <MemoryRouter initialEntries={['/questions']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /questions/i })).toBeInTheDocument()
  })

  it('renders 404 for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument()
  })
})
