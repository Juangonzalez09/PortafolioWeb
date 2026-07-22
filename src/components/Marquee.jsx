import { useState } from 'react'
import { X } from 'lucide-react'

export default function Marquee({ text = 'Software Engineer · Building With Heart' }) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  const items = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center bg-black text-white border-b border-white/10">
      <div className="relative flex-1 overflow-hidden py-2.5">
        <div className="flex animate-marquee whitespace-nowrap">
          {items.map((i) => (
            <span key={i} className="mx-4 text-[10px] font-medium tracking-wider uppercase sm:mx-6 sm:text-xs md:mx-8">
              {text} <span className="mx-2 text-white/40 sm:mx-3 md:mx-4">✦</span>
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
        className="flex h-full items-center px-4 py-2.5 text-white/60 transition-colors hover:text-white"
      >
        <X size={16} />
      </button>
    </div>
  )
}
