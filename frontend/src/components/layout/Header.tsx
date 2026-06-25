import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/papers', label: 'Papers' },
  { to: '/topics', label: 'Topics' },
  { to: '/questions', label: 'Questions' },
]

function NavLinks({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean
  onNavigate?: () => void
}) {
  const { user, profile, signOut } = useAuth()

  return (
    <ul className={mobile ? 'flex flex-col gap-1' : 'flex items-center gap-1'}>
      {navItems.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            end={item.to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-light text-primary'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
      {user && profile?.is_admin && (
        <li>
          <NavLink
            to="/admin"
            onClick={onNavigate}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-light text-primary'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            Admin
          </NavLink>
        </li>
      )}
      <li className={mobile ? 'mt-2 border-t pt-2' : 'ml-2 border-l pl-2'}>
        {user ? (
          <button
            onClick={() => { signOut(); onNavigate?.() }}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left"
          >
            Sign Out
          </button>
        ) : (
          <NavLink
            to="/login"
            onClick={onNavigate}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
          >
            Sign In
          </NavLink>
        )}
      </li>
    </ul>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      {open ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  )
}

function UserBadge() {
  const { user, profile } = useAuth()
  if (!user) return null

  return (
    <span className="hidden sm:inline text-sm text-gray-500 mr-2">
      {profile?.display_name || user.phone}
    </span>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="text-lg font-bold text-gray-900"
          aria-label="CPA Revision home"
        >
          CPA Revision
        </NavLink>

        <div className="flex items-center">
          <UserBadge />
          <nav aria-label="Main" className="hidden md:block">
            <NavLinks />
          </nav>
        </div>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <MenuIcon open={open} />
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Menu
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    aria-label="Close navigation menu"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </Dialog.Close>
              </div>
              <nav aria-label="Main" className="mt-6">
                <NavLinks mobile onNavigate={() => setOpen(false)} />
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  )
}
