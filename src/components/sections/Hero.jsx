import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { SiPython, SiDocker, SiApachespark } from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'
import { TbSql } from 'react-icons/tb'
import Navbar from '../Navbar'
import LangToggle from '../LangToggle'
import { useLanguage } from '../../context/LanguageContext'

const STACK = [
  { Icon: SiPython, label: 'Python', color: '#3776AB' },
  { Icon: FaAws, label: 'AWS', color: '#FF9900' },
  { Icon: TbSql, label: 'SQL', color: '#336791' },
  { Icon: SiDocker, label: 'Docker', color: '#2496ED' },
  { Icon: SiApachespark, label: 'Spark', color: '#E25A1C' },
]

const DESCRIPTION = {
  es: {
    role: 'Ingeniero De Software',
    highlight: ' DataOps-Ready ',
    serverHighlight: ' Soluciones Server-Side',
    before: ' Enfocado En Backend E Ingeniería De Datos, Construyendo Soluciones ',
    middle:
      ' Con AWS, Pipelines De CI/CD E Infraestructura En La Nube. Con Conocimientos En Despliegues De Servicios En La Nube Autoalojados — Un Perfil Completo Para',
    after:
      ', Comprometido Con Dominar El Espectro Completo De La Tecnología.',
  },
  en: {
    role: 'Software Engineer',
    highlight: ' DataOps-Ready ',
    serverHighlight: ' Server-Side Solutions',
    before: ' Focused On Backend And Data Engineering, Building ',
    middle:
      ' Solutions With AWS, CI/CD Pipelines And Cloud Infrastructure. Skilled In Self-Hosted Cloud Service Deployments — A Complete Profile For',
    after:
      ', Committed To Mastering The Full Spectrum Of Technology.',
  },
}

function FloatingIcon({ Icon, label, color, index }) {
  const [hover, setHover] = useState(false)

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="flex flex-col items-center gap-2"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3 + index * 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.2,
        }}
        whileHover={{ scale: 1.15, rotate: [0, -6, 6, 0], transition: { duration: 0.5 } }}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white"
        style={{
          borderColor: hover ? color : undefined,
          boxShadow: hover ? `0 4px 20px -4px ${color}40` : undefined,
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
      >
        <Icon
          size={22}
          style={{
            color: hover ? color : '#a3a3a3',
            transition: 'color 0.3s',
          }}
        />
      </motion.div>
      <span
        className="text-[10px] font-medium uppercase tracking-[0.15em] transition-colors duration-300"
        style={{ color: hover ? '#171717' : '#a3a3a3' }}
      >
        {label}
      </span>
    </motion.li>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { lang } = useLanguage()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92])
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -60])

  const t = DESCRIPTION[lang]

  return (
    <section
      ref={ref}
      id="index"
      data-section="index"
      className="relative flex min-h-screen items-center justify-center px-6 py-10"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 flex min-h-[85vh] w-full max-w-5xl flex-col rounded-3xl bg-white shadow-[0_0_80px_-10px_rgba(255,255,255,0.08),0_25px_60px_-15px_rgba(0,0,0,0.5)] before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-white before:blur-2xl before:opacity-30"
      >
        <Navbar />

        <div className="flex flex-1 flex-col justify-between px-10 pb-10 pt-6 md:px-16">
          {/* Top row: stack icons (left) + description (right) */}
          <div className="grid grid-cols-1 gap-10 pt-16 md:grid-cols-2 md:gap-16">
            {/* Stack icons — left column */}
            <div className="flex flex-col">
              <span className="mb-6 block text-base text-neutral-400">(Stack)</span>
              <ul className="flex flex-wrap items-start gap-6 md:gap-8">
                {STACK.map((item, i) => (
                  <FloatingIcon key={item.label} {...item} index={i} />
                ))}
              </ul>
            </div>

            {/* Description — right column */}
            <div className="md:justify-self-end md:max-w-sm">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="text-base text-neutral-400">(1)</span>
                <LangToggle />
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={lang}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="text-base leading-relaxed text-neutral-400 capitalize"
                >
                  <span className="text-neutral-900 font-medium">{t.role}</span>
                  {t.before}
                  <span className="text-neutral-900 font-medium">{t.highlight}</span>
                  {t.middle}
                  <span className="text-neutral-900 font-medium">{t.serverHighlight}</span>
                  {t.after}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Name — bottom */}
          <div>
            <span className="mb-2 block text-sm text-neutral-400">(2)</span>
            <h1 className="font-serif text-[clamp(2.5rem,7vw,7.5rem)] leading-[0.85] tracking-tight text-neutral-900">
              Juan Manuel<br />Gonzalez
            </h1>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
