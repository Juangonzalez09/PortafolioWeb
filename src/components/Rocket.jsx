import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const SECTION_IDS = ['index', 'about', 'projects', 'contact']
// A pass completes over at most this many screens of scrolling, so very tall
// sections don't leave the rocket frozen in the corner.
const MAX_FLY_SCREENS = 1.8

/**
 * Minimalist rocket that flies diagonally from the top-right corner down to the
 * bottom-left, passing *behind* the white cards (it sits on a z-layer between
 * the dark background and the content).
 *
 * - ONE continuous pass per section (no looping). The pass starts as soon as you
 *   enter a section and finishes within ~1.8 screens, then the rocket coasts off
 *   screen and fades — so it never sits frozen, even in the tall About section.
 * - Stays upright (never tilted); the flame + fluid motion sell the flight.
 * - Spring-smoothed scroll so the flight glides instead of snapping 1:1, with a
 *   launch animation on mount and a live thruster flame.
 */
export default function Rocket() {
  const { scrollY } = useScroll()
  const secRef = useRef([])
  const vhRef = useRef(typeof window !== 'undefined' ? window.innerHeight : 800)
  const [, force] = useState(0)

  useEffect(() => {
    const measure = () => {
      vhRef.current = window.innerHeight
      secRef.current = SECTION_IDS
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .map((el) => {
          const rect = el.getBoundingClientRect()
          return { top: rect.top + window.scrollY, height: el.offsetHeight || window.innerHeight }
        })
      force((n) => n + 1)
    }
    measure()
    // Re-measure once layout/fonts settle (section heights depend on content).
    const t = setTimeout(measure, 400)
    window.addEventListener('resize', measure)
    return () => { clearTimeout(t); window.removeEventListener('resize', measure) }
  }, [])

  // Spring-smooth the raw scroll so the rocket glides instead of snapping 1:1 —
  // responsive (not laggy) but still smooth.
  const smooth = useSpring(scrollY, { stiffness: 120, damping: 18, mass: 0.5 })

  // One continuous pass per section, starting the moment you enter it and
  // finishing within ~MAX_FLY_SCREENS so tall sections never freeze the rocket.
  const flight = useTransform(smooth, (v) => {
    const secs = secRef.current
    if (!secs.length) return 0
    let i = 0
    for (let k = 0; k < secs.length; k++) {
      if (v >= secs[k].top - 1) i = k
    }
    const s = secs[i]
    const flyDist = Math.min(s.height, vhRef.current * MAX_FLY_SCREENS)
    return Math.min(Math.max((v - s.top) / Math.max(flyDist, 1), 0), 1)
  })

  // flight 0 → top-right corner (on-screen, visible from the very start).
  // flight 1 → off-screen bottom-left; it fades out on the way so the reset unseen.
  const x = useTransform(flight, [0, 1], ['88vw', '-14vw'])
  const y = useTransform(flight, [0, 1], ['7vh', '106vh'])
  const opacity = useTransform(flight, [0, 0.88, 1], [1, 1, 0])

  return (
    <motion.div
      aria-hidden
      style={{ x, y, opacity }}
      className="pointer-events-none fixed left-0 top-0 z-[5] will-change-transform"
    >
      {/* Launch-in on mount */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 15, delay: 0.35 }}
      >
        <svg width="46" height="74" viewBox="0 0 48 78" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rk-body" x1="24" y1="4" x2="24" y2="57" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="1" stopColor="#c7cad1" />
            </linearGradient>
            <linearGradient id="rk-flame-out" x1="24" y1="54" x2="24" y2="78" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fde68a" />
              <stop offset="0.4" stopColor="#fb923c" />
              <stop offset="1" stopColor="#ef4444" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rk-flame-in" x1="24" y1="54" x2="24" y2="72" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="0.5" stopColor="#fde047" />
              <stop offset="1" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Thruster flame — attached to the tail, flickers + pulses length */}
          <motion.g
            style={{ transformOrigin: '24px 55px' }}
            animate={{ scaleY: [1, 1.45, 0.8, 1.3, 1], scaleX: [1, 0.85, 1.1, 0.9, 1], opacity: [0.9, 1, 0.65, 1, 0.9] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M16 55 C18 65 22 72 24 78 C26 72 30 65 32 55 C28 59 20 59 16 55 Z" fill="url(#rk-flame-out)" />
            <path d="M19 55 C20 62 23 67 24 71 C25 67 28 62 29 55 C26 58 22 58 19 55 Z" fill="url(#rk-flame-in)" />
          </motion.g>

          {/* Body */}
          <path
            d="M24 4 C31 11 34 19 34 30 L34 46 C34 52 31 56 24 57 C17 56 14 52 14 46 L14 30 C14 19 17 11 24 4 Z"
            fill="url(#rk-body)"
          />
          {/* Fins */}
          <path d="M14 41 L6 55 L14 51 Z" fill="#a5b4fc" />
          <path d="M34 41 L42 55 L34 51 Z" fill="#a5b4fc" />
          {/* Window */}
          <circle cx="24" cy="27" r="4.6" fill="#4f46e5" />
          <circle cx="24" cy="27" r="4.6" fill="none" stroke="#ffffff" strokeWidth="1.5" />
          {/* Nose highlight */}
          <path d="M24 6 C28 11 30 16 30 22 C27 17 21 17 18 22 C18 16 20 11 24 6 Z" fill="#eef2ff" opacity="0.7" />
        </svg>
      </motion.div>
    </motion.div>
  )
}
