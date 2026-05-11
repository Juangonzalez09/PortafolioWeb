import { useState, useEffect } from 'react'
import useActiveSection from '../hooks/useActiveSection'

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

const LINKS = [
  { id: 'index', href: '#index', label: '(Index)' },
  { id: 'about', href: '#about', label: '(About)' },
  { id: 'projects', href: '#projects', label: '(Projects & Stack)' },
  { id: 'contact', href: '#contact', label: '(Contact)' },
]

export default function Navbar() {
  const time = useCurrentTime()
  const activeSection = useActiveSection('index')

  return (
    <nav className="flex items-center justify-between px-4 py-4 sm:px-6 md:px-10 md:py-6 lg:px-16">
      <span className="font-serif text-xl sm:text-2xl tracking-tight">
        juanmax <sup className="text-[8px] sm:text-xs">™</sup>
      </span>

      <ul className="hidden sm:flex gap-2 md:gap-3 text-xs md:text-sm font-medium text-neutral-900">
        {LINKS.map((link) => {
          const isActive = activeSection === link.id
          return (
            <li key={link.id}>
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

      <span className="hidden md:block text-xs lg:text-sm font-medium text-neutral-900 tabular-nums">
        {time}
      </span>
    </nav>
  )
}
