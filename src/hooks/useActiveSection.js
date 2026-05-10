import { useEffect, useState } from 'react'

export default function useActiveSection(defaultId = 'index') {
  const [active, setActive] = useState(defaultId)

  useEffect(() => {
    const sections = document.querySelectorAll('section[data-section]')
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          setActive(visible.target.getAttribute('data-section'))
        }
      },
      { threshold: [0.5] }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return active
}
