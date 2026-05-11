import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FaAws, FaNodeJs, FaGithub, FaLinux } from 'react-icons/fa'
import { SiPython, SiReact, SiMysql, SiPostgresql } from 'react-icons/si'
import { TbServer, TbBinaryTree } from 'react-icons/tb'
import { VscAzureDevops } from 'react-icons/vsc'

const ORBITS = [
  {
    radius: 22,
    duration: 18,
    icons: [
      { Icon: SiPython, color: '#FFD43B', label: 'PY' },
      { Icon: FaNodeJs, color: '#8CC84B', label: 'NODE' },
      { Icon: SiReact, color: '#61DAFB', label: 'REACT' },
    ],
  },
  {
    radius: 34,
    duration: 30,
    direction: -1,
    icons: [
      { Icon: FaAws, color: '#FF9900', label: 'AWS' },
      { Icon: TbBinaryTree, color: '#8B5CF6', label: 'GLUE' },
      { Icon: SiPostgresql, color: '#4169E1', label: 'PG' },
      { Icon: SiMysql, color: '#00758F', label: 'MYSQL' },
      { Icon: FaLinux, color: '#E5E7EB', label: 'LINUX' },
    ],
  },
  {
    radius: 46,
    duration: 50,
    icons: [
      { Icon: VscAzureDevops, color: '#2496ED', label: 'AZ-PIPE' },
      { Icon: FaGithub, color: '#E5E7EB', label: 'GH' },
      { Icon: TbServer, color: '#94A3B8', label: 'SRV' },
    ],
  },
]

function Orbit({ radius, duration, direction = 1, icons, iconSize = 14 }) {
  const angleStep = 360 / icons.length

  return (
    <>
      <div
        className="absolute left-1/2 top-1/2 rounded-full border border-white/10"
        style={{
          width: `${radius * 2}%`,
          height: `${radius * 2}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{
          width: `${radius * 2}%`,
          height: `${radius * 2}%`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ rotate: 360 * direction }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {icons.map(({ Icon, color }, i) => {
          const angle = (angleStep * i * Math.PI) / 180
          const x = 50 + 50 * Math.cos(angle)
          const y = 50 + 50 * Math.sin(angle)
          return (
            <motion.div
              key={i}
              className="absolute flex items-center justify-center rounded-full bg-neutral-950/80 backdrop-blur-sm ring-1 ring-white/10"
              style={{
                width: 28,
                height: 28,
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ rotate: -360 * direction }}
              transition={{ duration, ease: 'linear', repeat: Infinity }}
            >
              <Icon size={iconSize} color={color} />
            </motion.div>
          )
        })}
      </motion.div>
    </>
  )
}

function Spaceship({ scrollYProgress }) {
  const angle = useTransform(scrollYProgress, [0, 1], [0, 540])
  const orbitRadius = 40

  const x = useTransform(angle, (a) => 50 + orbitRadius * Math.cos((a * Math.PI) / 180))
  const y = useTransform(angle, (a) => 50 + orbitRadius * Math.sin((a * Math.PI) / 180))
  const rotation = useTransform(angle, (a) => a + 90)

  return (
    <motion.div
      className="absolute z-20"
      style={{
        left: useTransform(x, (v) => `${v}%`),
        top: useTransform(y, (v) => `${v}%`),
        translateX: '-50%',
        translateY: '-50%',
        rotate: rotation,
      }}
    >
      <div className="relative">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L7 14L12 12L17 14L12 2Z"
            fill="#fbbf24"
            stroke="#fde68a"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path d="M9.5 14L12 12L14.5 14L12 16L9.5 14Z" fill="#f59e0b" stroke="#fde68a" strokeWidth="0.5" />
          <circle cx="12" cy="9" r="1" fill="#fef3c7" />
        </svg>
        <motion.div
          className="absolute left-1/2 top-full -translate-x-1/2"
          animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.7, 1.2, 0.7] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        >
          <div className="h-4 w-[3px] rounded-full bg-gradient-to-b from-amber-400 via-orange-500 to-transparent blur-[0.5px]" />
        </motion.div>
        <div className="absolute inset-0 -z-10 rounded-full bg-amber-400/40 blur-md" />
      </div>
    </motion.div>
  )
}

function Stars() {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    x: (i * 73) % 100,
    y: (i * 137) % 100,
    size: (i % 3) * 0.5 + 0.5,
    delay: (i * 0.13) % 3,
  }))

  return (
    <>
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: s.delay }}
        />
      ))}
    </>
  )
}

export default function TechSolarSystem() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const coreScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9])

  return (
    <div
      ref={ref}
      className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-black shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18)_0%,transparent_60%)]" />

      <Stars />

      {/* Telemetry labels */}
      <div className="absolute left-4 top-4 font-mono text-[9px] uppercase tracking-wider text-white/40">
        <div>SYS · ONLINE</div>
        <div className="mt-1 text-white/30">LAT 6.2476° N</div>
        <div className="text-white/30">LON 75.5658° W</div>
      </div>
      <div className="absolute right-4 top-4 text-right font-mono text-[9px] uppercase tracking-wider text-white/40">
        <div>STACK · v4.6</div>
        <div className="mt-1 text-white/30">11 NODES</div>
      </div>
      <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-wider text-white/40">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>RUNTIME</span>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[9px] uppercase tracking-wider text-white/40">
        <div>JM · CORE</div>
      </div>

      {/* Corner brackets */}
      <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-white/20" />
      <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-white/20" />
      <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-white/20" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-white/20" />

      {/* Solar system */}
      <div className="absolute inset-0">
        {ORBITS.map((orbit, i) => (
          <Orbit key={i} {...orbit} />
        ))}

        {/* Central core */}
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-12 w-12 items-center justify-center"
          style={{ transform: 'translate(-50%, -50%)', scale: coreScale }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 via-violet-500 to-fuchsia-500 blur-md"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-300 to-violet-600 ring-2 ring-white/20">
            <span className="font-serif text-[11px] italic text-white">JM</span>
          </div>
        </motion.div>

        <Spaceship scrollYProgress={scrollYProgress} />
      </div>

      {/* Scan line */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
