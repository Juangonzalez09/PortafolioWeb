import { motion } from 'framer-motion'

const LOG_LINES = [
  { t: '[OK]', c: 'text-emerald-400', msg: 'establishing secure channel...' },
  { t: '[NET]', c: 'text-cyan-400', msg: 'resolving juanmanueldev.website' },
  { t: '[AUTH]', c: 'text-violet-400', msg: 'handshake · TLS 1.3' },
  { t: '[OK]', c: 'text-emerald-400', msg: 'session opened · uid=juanmax' },
  { t: '[INFO]', c: 'text-amber-400', msg: 'channels: linkedin, mail, github' },
  { t: '[READY]', c: 'text-emerald-400', msg: 'awaiting message...' },
]

export default function ContactTerminal() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-neutral-950 font-mono text-[10px] leading-relaxed shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-neutral-900/80 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-500/70" />
        <span className="h-2 w-2 rounded-full bg-amber-500/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
        <span className="ml-2 text-[9px] uppercase tracking-wider text-white/40">~ /juanmax/contact</span>
      </div>

      {/* Background grid */}
      <div
        className="absolute inset-0 top-8 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Terminal content */}
      <div className="relative px-3 py-3 text-white/80">
        <div className="flex">
          <span className="text-emerald-400">$</span>
          <span className="ml-2 text-white">connect</span>
          <span className="ml-2 text-cyan-400">--user</span>
          <span className="text-white/60">=</span>
          <span className="text-amber-300">juanmax</span>
        </div>

        <div className="mt-2 space-y-0.5">
          {LOG_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.35, duration: 0.3 }}
              className="flex items-start gap-2"
            >
              <span className={`${line.c} font-medium`}>{line.t}</span>
              <span className="text-white/50">{line.msg}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="mt-2 flex items-center"
        >
          <span className="text-emerald-400">$</span>
          <motion.span
            className="ml-2 inline-block h-3 w-1.5 bg-emerald-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Status footer */}
        <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[8px] uppercase tracking-wider text-white/40">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>connected</span>
          </div>
          <span>0.0s · 200 ok</span>
        </div>
      </div>

      {/* Scan line */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
        animate={{ top: ['8%', '100%', '8%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
