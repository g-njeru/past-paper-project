import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import SkipLink from './SkipLink'
import Header from './Header'
import { AnnounceProvider } from '../../hooks/useAnnounce'
import { useAnnounce } from '../../hooks/announce-context'
import A11yStyles from '../a11y/A11yStyles'
import { A11yToggle } from '../a11y/A11yToggle'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/papers': 'Papers',
  '/topics': 'Topics',
  '/questions': 'Questions',
  '/login': 'Sign In',
  '/signup': 'Sign Up',
  '/admin': 'Admin Panel',
}

function PageTitleAnnouncer() {
  const { pathname } = useLocation()
  const { announce } = useAnnounce()

  useEffect(() => {
    const title = pageTitles[pathname]
    if (title) {
      announce(`Now viewing: ${title}`)
    }
  }, [pathname, announce])

  return null
}

export default function Layout() {
  return (
    <AnnounceProvider>
      <div className="relative flex min-h-screen flex-col bg-gray-50">
        <SkipLink />
        <Header />
        <PageTitleAnnouncer />
        <A11yStyles />
        <A11yToggle />
        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
        >
          <Outlet />
        </main>
      </div>
    </AnnounceProvider>
  )
}
