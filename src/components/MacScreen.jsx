import { motion, useTransform, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { FaApple, FaFolderOpen } from 'react-icons/fa'
import { SiPython } from 'react-icons/si'
import portraitImg from '../assets/portrait.jpg'

// ============================================================
// Python code (tokenized for syntax highlighting + typewriter)
// ============================================================
const C = {
  comment: '#6a9955',
  keyword: '#c586c0',
  builtin: '#569cd6',
  string: '#ce9178',
  fn: '#dcdcaa',
  cls: '#4ec9b0',
  ident: '#9cdcfe',
  text: '#d4d4d4',
  num: '#b5cea8',
}

const CODE_TOKENS = [
  { t: '# profile.py\n', c: C.comment },
  { t: 'from ', c: C.keyword },
  { t: 'src.engineer ', c: C.text },
  { t: 'import ', c: C.keyword },
  { t: 'SoftwareEngineer\n', c: C.cls },
  { t: 'from ', c: C.keyword },
  { t: 'datetime ', c: C.text },
  { t: 'import ', c: C.keyword },
  { t: 'datetime\n\n', c: C.ident },
  { t: 'juanma', c: C.ident },
  { t: ' = ', c: C.text },
  { t: 'SoftwareEngineer', c: C.cls },
  { t: '(\n', c: C.text },
  { t: '    name', c: C.ident },
  { t: '=', c: C.text },
  { t: '"Juan Manuel Gonzalez"', c: C.string },
  { t: ',\n', c: C.text },
  { t: '    role', c: C.ident },
  { t: '=', c: C.text },
  { t: '"Backend & Data Engineering"', c: C.string },
  { t: ',\n', c: C.text },
  { t: '    location', c: C.ident },
  { t: '=', c: C.text },
  { t: '"Medellín, Colombia"', c: C.string },
  { t: ',\n', c: C.text },
  { t: '    stack', c: C.ident },
  { t: '=[', c: C.text },
  { t: '"Python"', c: C.string },
  { t: ', ', c: C.text },
  { t: '"AWS"', c: C.string },
  { t: ', ', c: C.text },
  { t: '"Spark"', c: C.string },
  { t: ', ', c: C.text },
  { t: '"Node.js"', c: C.string },
  { t: '],\n', c: C.text },
  { t: '    since', c: C.ident },
  { t: '=', c: C.text },
  { t: 'datetime', c: C.fn },
  { t: '(', c: C.text },
  { t: '2020', c: C.num },
  { t: ', ', c: C.text },
  { t: '1', c: C.num },
  { t: ', ', c: C.text },
  { t: '1', c: C.num },
  { t: '),\n', c: C.text },
  { t: '    open_to_work', c: C.ident },
  { t: '=', c: C.text },
  { t: 'True', c: C.builtin },
  { t: ',\n', c: C.text },
  { t: ')\n\n', c: C.text },
  { t: 'print', c: C.fn },
  { t: '(', c: C.text },
  { t: 'juanma', c: C.ident },
  { t: '.', c: C.text },
  { t: 'introduce', c: C.fn },
  { t: '())\n', c: C.text },
  { t: '# => "Building with purpose, one system at a time."', c: C.comment },
]

const TOTAL_CHARS = CODE_TOKENS.reduce((s, t) => s + t.t.length, 0)

// ============================================================
// Dock items
// ============================================================
const DOCK_ITEMS = [
  { label: 'Finder', bg: 'linear-gradient(180deg,#3eb4ff 0%,#0085ff 100%)', glyph: '☻' },
  { label: 'Launchpad', bg: 'radial-gradient(circle at 30% 30%,#6b7280,#1f2937)', glyph: '⊞' },
  { label: 'Safari', bg: 'radial-gradient(circle at 50% 40%,#fff 0%,#3aa1ff 35%,#0050b3 100%)', glyph: '🧭' },
  { label: 'Mail', bg: 'linear-gradient(180deg,#5ad1ff 0%,#1a8cff 100%)', glyph: '✉' },
  { label: 'Terminal', bg: 'linear-gradient(180deg,#3a3a3a 0%,#111 100%)', glyph: '_' },
  { label: 'VSCode', bg: 'linear-gradient(180deg,#0078d4 0%,#005a9e 100%)', glyph: '<>', isVSCode: true },
  { label: 'Settings', bg: 'radial-gradient(circle at 50% 50%,#9ca3af,#374151)', glyph: '⚙' },
]

const WALLPAPER_BG =
  'radial-gradient(ellipse at 20% 10%, #6366f1 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, #ec4899 0%, transparent 50%), linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #831843 100%)'

// ============================================================
// Helpers
// ============================================================
function formatTime() {
  const d = new Date()
  const h = d.getHours() % 12 || 12
  const m = d.getMinutes().toString().padStart(2, '0')
  return `${h}:${m}`
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

// ============================================================
// Main component
// ============================================================
export default function MacScreen({ scrollYProgress }) {
  // ---- Stage: hard cut — only ONE stage rendered at a time ----
  const [stage, setStage] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (p < 0.17) setStage(0)       // boot
    else if (p < 0.37) setStage(1)  // lock screen
    else if (p < 0.60) setStage(2)  // desktop + cursor
    else setStage(3)                 // vscode + typewriter
  })

  // ---- Internal animations (smooth within each stage) ----
  const bootBarWidth = useTransform(scrollYProgress, [0.02, 0.14], ['0%', '100%'])
  const dotsProgress = useTransform(scrollYProgress, [0.28, 0.36], [0, 6])
  const menuBarY = useTransform(scrollYProgress, [0.37, 0.42], ['-100%', '0%'])
  const dockY = useTransform(scrollYProgress, [0.39, 0.44], ['120%', '0%'])
  const cursorOpacity = useTransform(scrollYProgress, [0.46, 0.48], [0, 1])
  const cursorX = useTransform(scrollYProgress, [0.48, 0.56], ['50%', '60%'])
  const cursorY = useTransform(scrollYProgress, [0.48, 0.56], ['40%', '88%'])
  const vscodeIconScale = useTransform(scrollYProgress, [0.54, 0.58, 0.62], [1, 1.3, 1])
  const vscodeWinScale = useTransform(scrollYProgress, [0.60, 0.68], [0.3, 1])
  const typewriterProgress = useTransform(scrollYProgress, [0.68, 0.92], [0, 1])

  const [visibleChars, setVisibleChars] = useState(0)
  useMotionValueEvent(typewriterProgress, 'change', (p) => {
    setVisibleChars(Math.max(0, Math.floor(p * TOTAL_CHARS)))
  })

  return (
    <div className="w-full">
      {/* MacBook frame */}
      <div className="relative">
        {/* Screen body (dark bezel) */}
        <div
          className="relative w-full overflow-hidden rounded-[14px] bg-zinc-900 p-[6px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4),0_30px_60px_-30px_rgba(0,0,0,0.3)]"
          style={{ aspectRatio: '16 / 10' }}
        >
          {/* Notch */}
          <div className="absolute left-1/2 top-[6px] z-30 h-[8px] w-[55px] -translate-x-1/2 rounded-b-md bg-black" />

          {/* Screen — bg-black ensures no flash between stages */}
          <div className="relative h-full w-full overflow-hidden rounded-[8px] bg-black">

            {/* ============== STAGE 0: BOOT ============== */}
            {stage === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
                <FaApple className="text-white" size={42} />
                <div className="mt-5 h-[2px] w-[30%] overflow-hidden rounded-full bg-white/15">
                  <motion.div style={{ width: bootBarWidth }} className="h-full bg-white" />
                </div>
              </div>
            )}

            {/* ============== STAGE 1: LOCK SCREEN ============== */}
            {stage === 1 && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-between py-[6%]"
                style={{ background: WALLPAPER_BG }}
              >
                {/* Time + date */}
                <div className="mt-[8%] text-center text-white">
                  <div className="text-[2.8vw] font-light leading-none tracking-tight md:text-[1.6vw]">
                    {formatTime()}
                  </div>
                  <div className="mt-1 text-[0.9vw] font-light md:text-[0.55vw]">{formatDate()}</div>
                </div>

                {/* Avatar + password */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="overflow-hidden rounded-full ring-1 ring-white/40"
                    style={{ width: '12%', aspectRatio: '1/1', minWidth: 36 }}
                  >
                    <img src={portraitImg} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="text-[0.85vw] font-medium text-white md:text-[0.55vw]">
                    Juan Manuel
                  </div>
                  {/* Password dots */}
                  <div className="flex h-[18px] items-center gap-[6px] rounded-full bg-white/15 px-3 backdrop-blur-md">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <Dot key={i} index={i} dotsProgress={dotsProgress} />
                    ))}
                  </div>
                  <div className="mt-1 text-[0.7vw] font-light text-white/60 md:text-[0.45vw]">
                    Touch ID or Enter Password
                  </div>
                </div>
              </div>
            )}

            {/* ============== STAGE 2: DESKTOP ============== */}
            {stage === 2 && (
              <div className="absolute inset-0" style={{ background: WALLPAPER_BG }}>
                {/* Menu bar */}
                <motion.div
                  style={{ y: menuBarY }}
                  className="absolute left-0 right-0 top-0 flex items-center justify-between bg-black/30 px-3 py-1 text-[0.6vw] text-white backdrop-blur-md md:text-[0.4vw]"
                >
                  <div className="flex items-center gap-3">
                    <FaApple size={10} />
                    <span className="font-semibold">Finder</span>
                    <span className="opacity-80">File</span>
                    <span className="opacity-80">Edit</span>
                    <span className="opacity-80">View</span>
                    <span className="opacity-80">Go</span>
                    <span className="opacity-80">Window</span>
                    <span className="opacity-80">Help</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="opacity-80">{formatTime()}</span>
                  </div>
                </motion.div>

                {/* Dock */}
                <motion.div
                  style={{ y: dockY }}
                  className="absolute bottom-[2%] left-1/2 -translate-x-1/2 rounded-xl bg-white/15 px-[6px] py-[4px] backdrop-blur-md ring-1 ring-white/20"
                >
                  <div className="flex items-end gap-[5px]">
                    {DOCK_ITEMS.map((item) => (
                      <motion.div
                        key={item.label}
                        style={{
                          background: item.bg,
                          scale: item.isVSCode ? vscodeIconScale : 1,
                        }}
                        className="flex items-center justify-center rounded-[7px] text-white shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
                      >
                        <div
                          className="flex items-center justify-center text-[1vw] font-bold md:text-[0.7vw]"
                          style={{ width: '2.2vw', height: '2.2vw', minWidth: 22, minHeight: 22 }}
                        >
                          {item.glyph}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Cursor */}
                <motion.svg
                  style={{ opacity: cursorOpacity, left: cursorX, top: cursorY }}
                  className="absolute"
                  width="14"
                  height="18"
                  viewBox="0 0 14 18"
                  fill="none"
                >
                  <path
                    d="M1 1 L1 13 L4.5 10 L7 16 L9 15 L6.5 9.5 L11 9.5 Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </div>
            )}

            {/* ============== STAGE 3: VS CODE ============== */}
            {stage === 3 && (
              <div className="absolute inset-0 bg-[#1e1e1e]">
                <motion.div
                  style={{ scale: vscodeWinScale, transformOrigin: '50% 100%' }}
                  className="h-full w-full overflow-hidden"
                >
                  {/* Title bar */}
                  <div className="flex h-[18px] items-center gap-1.5 bg-[#323233] px-2">
                    <div className="h-[8px] w-[8px] rounded-full bg-[#ff5f57]" />
                    <div className="h-[8px] w-[8px] rounded-full bg-[#febc2e]" />
                    <div className="h-[8px] w-[8px] rounded-full bg-[#28c840]" />
                    <div className="ml-3 text-[0.55vw] text-white/60 md:text-[0.4vw]">
                      juanmax &mdash; profile.py
                    </div>
                  </div>

                  <div className="flex h-[calc(100%-18px)]">
                    {/* Activity bar */}
                    <div className="flex w-[18px] flex-col items-center gap-2 bg-[#333333] py-2 text-white/60">
                      <div className="text-[0.7vw]">{'\u{1F4C4}'}</div>
                      <div className="text-[0.7vw]">{'🔍'}</div>
                      <div className="text-[0.7vw]">{'⎇'}</div>
                      <div className="text-[0.7vw]">{'▶'}</div>
                    </div>

                    {/* File explorer */}
                    <div className="w-[22%] border-r border-black/40 bg-[#252526] p-1.5 text-[0.55vw] text-white/80 md:text-[0.4vw]">
                      <div className="mb-1 px-1 text-[0.5vw] uppercase tracking-wider text-white/40 md:text-[0.38vw]">
                        Explorer
                      </div>
                      <div className="mb-0.5 flex items-center gap-1 px-1 font-semibold">
                        <span>{'▾'}</span>
                        <span>JUANMAX</span>
                      </div>
                      <div className="ml-2 flex items-center gap-1 px-1">
                        <span>{'▾'}</span>
                        <FaFolderOpen className="text-[#dcb67a]" size={9} />
                        <span>src</span>
                      </div>
                      <div className="ml-6 flex items-center gap-1 px-1 text-white/70">
                        <SiPython className="text-[#3776ab]" size={8} />
                        <span>engineer.py</span>
                      </div>
                      <div className="ml-6 flex items-center gap-1 px-1 text-white/70">
                        <SiPython className="text-[#3776ab]" size={8} />
                        <span>config.py</span>
                      </div>
                      <div className="ml-2 flex items-center gap-1 rounded bg-[#37373d] px-1 text-white">
                        <SiPython className="text-[#3776ab]" size={8} />
                        <span>profile.py</span>
                      </div>
                      <div className="ml-2 flex items-center gap-1 px-1 text-white/60">
                        <span style={{ width: 8 }} />
                        <span>requirements.txt</span>
                      </div>
                      <div className="ml-2 flex items-center gap-1 px-1 text-white/60">
                        <span style={{ width: 8 }} />
                        <span>README.md</span>
                      </div>
                    </div>

                    {/* Editor */}
                    <div className="flex flex-1 flex-col">
                      {/* Tabs */}
                      <div className="flex h-[16px] bg-[#252526] text-[0.55vw] text-white/60 md:text-[0.4vw]">
                        <div className="flex items-center gap-1 border-r border-black/40 bg-[#1e1e1e] px-2 text-white">
                          <SiPython className="text-[#3776ab]" size={8} />
                          <span>profile.py</span>
                          <span className="ml-1 opacity-60">{'×'}</span>
                        </div>
                        <div className="flex items-center gap-1 border-r border-black/40 px-2">
                          <SiPython className="text-[#3776ab]" size={8} />
                          <span>engineer.py</span>
                        </div>
                        <div className="flex items-center gap-1 border-r border-black/40 px-2">
                          <SiPython className="text-[#3776ab]" size={8} />
                          <span>config.py</span>
                        </div>
                      </div>

                      {/* Code area */}
                      <div className="flex flex-1 overflow-hidden bg-[#1e1e1e] font-mono text-[0.6vw] leading-[1.5] md:text-[0.45vw]">
                        {/* Line numbers */}
                        <div className="select-none px-1.5 py-1 text-right text-white/30">
                          {Array.from({ length: 22 }, (_, i) => (
                            <div key={i}>{i + 1}</div>
                          ))}
                        </div>
                        {/* Code */}
                        <pre className="flex-1 overflow-hidden whitespace-pre py-1 pr-1.5">
                          <TypedCode visibleChars={visibleChars} />
                        </pre>
                      </div>

                      {/* Status bar */}
                      <div className="flex h-[12px] items-center justify-between bg-[#007acc] px-1.5 text-[0.45vw] text-white md:text-[0.35vw]">
                        <div className="flex items-center gap-2">
                          <span>{'⎇'} main</span>
                          <span>{'●'} 0</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>Python 3.12</span>
                          <span>UTF-8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

          </div>
        </div>

        {/* MacBook base / hinge */}
        <div className="mx-auto h-[6px] w-[102%] -translate-x-[1%] rounded-b-[10px] bg-gradient-to-b from-zinc-700 to-zinc-800 shadow-md" />
        <div className="mx-auto mt-[1px] h-[3px] w-[28%] rounded-b-md bg-zinc-700/70" />
      </div>
    </div>
  )
}

// ============================================================
// Password dot
// ============================================================
function Dot({ index, dotsProgress }) {
  const [filled, setFilled] = useState(false)
  useMotionValueEvent(dotsProgress, 'change', (v) => {
    setFilled(v > index)
  })
  return (
    <div
      className="rounded-full transition-colors duration-150"
      style={{
        width: 6,
        height: 6,
        backgroundColor: filled ? 'white' : 'rgba(255,255,255,0.3)',
      }}
    />
  )
}

// ============================================================
// Typed code renderer
// ============================================================
function TypedCode({ visibleChars }) {
  let remaining = visibleChars
  const out = []
  for (let i = 0; i < CODE_TOKENS.length; i++) {
    if (remaining <= 0) break
    const tok = CODE_TOKENS[i]
    const slice = tok.t.slice(0, remaining)
    out.push(
      <span key={i} style={{ color: tok.c }}>
        {slice}
      </span>
    )
    remaining -= tok.t.length
  }
  out.push(
    <span key="caret" className="inline-block animate-pulse" style={{ color: C.text }}>
      {'▍'}
    </span>
  )
  return <>{out}</>
}
