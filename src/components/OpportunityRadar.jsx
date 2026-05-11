import { motion } from 'framer-motion'

const BLIPS = [
  { x: 30, y: 25, delay: 0.5, label: 'EU' },
  { x: 72, y: 38, delay: 2.1, label: 'US' },
  { x: 55, y: 70, delay: 3.6, label: 'LATAM' },
  { x: 22, y: 62, delay: 5.0, label: 'CA' },
  { x: 80, y: 78, delay: 6.4, label: 'APAC' },
]

export default function OpportunityRadar() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-br from-neutral-950 via-emerald-950/30 to-black shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16,185,129,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.6) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Telemetry */}
      <div className="absolute left-3 top-3 z-10 font-mono text-[8px] uppercase tracking-wider text-emerald-400/70">
        <div>RADAR · ACTIVE</div>
        <div className="mt-0.5 text-emerald-400/40">SCAN · 360°</div>
      </div>
      <div className="absolute right-3 top-3 z-10 text-right font-mono text-[8px] uppercase tracking-wider text-emerald-400/70">
        <div className="flex items-center justify-end gap-1">
          <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
          <span>ONLINE</span>
        </div>
        <div className="mt-0.5 text-emerald-400/40">v4.6</div>
      </div>

      {/* Corner brackets */}
      <div className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-emerald-400/30" />
      <div className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-emerald-400/30" />
      <div className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-emerald-400/30" />
      <div className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-emerald-400/30" />

      {/* Radar circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative aspect-square w-[78%]">
          {/* Concentric rings */}
          {[1, 0.75, 0.5, 0.25].map((scale, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full border border-emerald-400/20"
              style={{
                width: `${scale * 100}%`,
                height: `${scale * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

          {/* Crosshairs */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-emerald-400/15" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-emerald-400/15" />

          {/* Sweeping arm */}
          <motion.div
            className="absolute left-1/2 top-1/2 origin-left"
            style={{
              width: '50%',
              height: '2px',
              transform: 'translateY(-50%)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
          >
            <div className="h-full w-full bg-gradient-to-r from-emerald-400 via-emerald-400/40 to-transparent" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'conic-gradient(from 0deg, rgba(16,185,129,0.25) 0deg, transparent 60deg)',
                width: '200%',
                height: '200vh',
                left: 0,
                top: '-100vh',
                transformOrigin: 'left center',
              }}
            />
          </motion.div>

          {/* Center dot */}
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />

          {/* Opportunity blips */}
          {BLIPS.map((blip, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${blip.x}%`, top: `${blip.y}%`, transform: 'translate(-50%, -50%)' }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 4, delay: blip.delay, repeat: Infinity, repeatDelay: 4 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-emerald-400/40"
                  animate={{ scale: [1, 3], opacity: [0.8, 0] }}
                  transition={{ duration: 1.5, delay: blip.delay, repeat: Infinity, repeatDelay: 6.5 }}
                  style={{ width: 8, height: 8 }}
                />
                <div
                  className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]"
                />
                <span className="absolute left-3 top-0 font-mono text-[7px] uppercase tracking-wider text-emerald-300/80">
                  {blip.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom status */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between font-mono text-[8px] uppercase tracking-wider">
        <span className="text-emerald-400/70">SCANNING · OPPORTUNITIES</span>
        <span className="text-emerald-400/40">JM-CORE</span>
      </div>
    </div>
  )
}
