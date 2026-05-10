import { useState, useEffect } from 'react'

function useCurrentTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    function update() {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      const s = String(now.getSeconds()).padStart(2, '0')
      const offset = -now.getTimezoneOffset() / 60
      const sign = offset >= 0 ? '+' : ''
      setTime(`${h}:${m}:${s} (UTC${sign}${offset})`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

function useActiveHash() {
  const [hash, setHash] = useState(typeof window !== 'undefined' ? window.location.hash : '')

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return hash
}

const LINKS = [
  { href: '#about', label: '(About)' },
  { href: '#projects', label: '(Projects)' },
  { href: '#stack', label: '(Stack)' },
  { href: '#contact', label: '(Contact)' },
]

export default function Navbar() {
  const time = useCurrentTime()
  const activeHash = useActiveHash()

  return (
    <nav className="flex items-center justify-between px-10 py-6 md:px-16">
      <span className="font-serif text-2xl tracking-tight">
        juanmax <sup className="text-xs">™</sup>
      </span>

      <ul className="hidden sm:flex gap-3 text-sm font-medium text-neutral-900">
        {LINKS.map((link) => {
          const isActive = activeHash === link.href
          return (
            <li key={link.href}>
              <a
                href={link.href}
                className={`transition-colors ${
                  isActive
                    ? 'text-neutral-400'
                    : 'text-neutral-900 hover:text-neutral-500'
                }`}
              >
                {link.label}
              </a>
            </li>
          )
        })}
      </ul>

      <span className="hidden md:block text-xs text-neutral-400 tabular-nums">
        {time}
      </span>
    </nav>
  )
}
