import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { WhitelistEntry } from '../types/database'
import { useFocusReset } from '../hooks/useFocusReset'

export default function Admin() {
  const [whitelist, setWhitelist] = useState<WhitelistEntry[]>([])
  const [newPhone, setNewPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const headingRef = useFocusReset('/admin')

  async function fetchWhitelist() {
    const { data } = await supabase.from('whitelist').select('*').order('created_at', { ascending: false })
    if (data) setWhitelist(data)
    setLoading(false)
  }

  useEffect(() => { fetchWhitelist() }, []) // eslint-disable-line react-hooks/set-state-in-effect

  const addNumber = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!newPhone.trim()) return
    const { error: err } = await supabase
      .from('whitelist')
      .insert({ phone: newPhone.trim() })
    if (err) {
      setError(err.message)
    } else {
      setNewPhone('')
      fetchWhitelist()
    }
  }

  const removeNumber = async (id: number) => {
    await supabase.from('whitelist').delete().eq('id', id)
    fetchWhitelist()
  }

  if (loading) {
    return <div className="flex min-h-[50vh] items-center justify-center"><p className="text-gray-500">Loading...</p></div>
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 ref={headingRef} id="page-heading" tabIndex={-1}
        className="text-2xl font-bold text-gray-900 focus:outline-none">
        Admin Panel
      </h1>
      <p className="mt-2 text-gray-600">Manage the whitelist of phone numbers allowed to access past papers.</p>

      <section aria-labelledby="add-heading" className="mt-8">
        <h2 id="add-heading" className="text-lg font-semibold text-gray-900">
          Add Phone Number
        </h2>
        <form onSubmit={addNumber} className="mt-3 flex gap-2">
          <input
            type="tel"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            placeholder="+2547XXXXXXXX"
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add
          </button>
        </form>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </section>

      <section aria-labelledby="list-heading" className="mt-8">
        <h2 id="list-heading" className="text-lg font-semibold text-gray-900">
          Whitelist ({whitelist.length})
        </h2>
        {whitelist.length === 0 ? (
          <p className="mt-3 text-gray-500">No numbers added yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {whitelist.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between rounded-md border px-4 py-2"
              >
                <span className="text-sm">{entry.phone}</span>
                <button
                  onClick={() => removeNumber(entry.id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
