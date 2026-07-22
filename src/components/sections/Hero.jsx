import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { SiPython, SiDocker, SiApachespark, SiPostgresql } from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'
import Navbar from '../Navbar'
import LangToggle from '../LangToggle'
import { useLanguage } from '../../context/LanguageContext'

const STACK = [
  { Icon: SiPython, label: 'Python', color: '#3776AB' },
  { Icon: FaAws, label: 'AWS', color: '#FF9900' },
  { Icon: SiPostgresql, label: 'PostgreSQL', color: '#4169E1' },
  { Icon: SiDocker, label: 'Docker', color: '#2496ED' },
  { Icon: SiApachespark, label: 'Spark', color: '#E25A1C' },
]

const DESCRIPTION = {
  es: {
    intro: {
      label: 'Ingeniero de Software',
      dot: '#171717',
      text: 'Abordo cada problema desde una perspectiva de ingeniería: entiendo el contexto y el negocio antes de construir, aplicando arquitecturas limpias y buenas prácticas para crear sistemas mantenibles, escalables y confiables.',
    },
    cloud: {
      label: 'Especializado en Cloud',
      dot: '#6366f1',
      text: 'Especializado en AWS, diseño y opero infraestructura de producción: contenedores, redes, CI/CD, seguridad, observabilidad y optimización de costos.',
    },
    data: {
      label: 'Especializado en Datos',
      dot: '#06b6d4',
      text: 'Diseño arquitecturas de datos: data lakes, ETL y pipelines analíticos con Glue, Athena, S3, Spark y Airflow, confiables y listas para decidir a gran escala.',
    },
  },
  en: {
    intro: {
      label: 'Software Engineer',
      dot: '#171717',
      text: 'I approach every problem from an engineering standpoint: I understand the context and the business before building, applying clean architectures and best practices to create maintainable, scalable and reliable systems.',
    },
    cloud: {
      label: 'Cloud Specialization',
      dot: '#6366f1',
      text: 'Specialized in AWS, I design and operate production infrastructure: containers, networking, CI/CD, security, observability and cost optimization.',
    },
    data: {
      label: 'Data Specialization',
      dot: '#06b6d4',
      text: 'I design data architectures: data lakes, ETL and analytics pipelines with Glue, Athena, S3, Spark and Airflow, reliable and ready for decisions at scale.',
    },
  },
}

const DESC_BLOCKS = ['intro', 'cloud', 'data']

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
        whileHover={{ scale: 1.12, y: -4, transition: { type: 'spring', stiffness: 300, damping: 14 } }}
        className="relative flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          backgroundColor: hover ? `${color}26` : `${color}14`,
          border: `1.5px solid ${hover ? color : `${color}59`}`,
          boxShadow: hover ? `0 14px 30px -10px ${color}99` : `0 6px 18px -12px ${color}80`,
          transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
        }}
      >
        <motion.span
          animate={{ rotate: hover ? [0, -8, 8, 0] : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="relative z-10"
        >
          <Icon size={22} style={{ color }} />
        </motion.span>
      </motion.div>
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300"
        style={{ color: hover ? color : '#525252' }}
      >
        {label}
      </span>
    </motion.li>
  )
}

const BRAG = {
  es: [
    'ARQUITECTURAS LIMPIAS',
    'PRINCIPIOS SOLID',
    'INFRAESTRUCTURA COMO CÓDIGO',
    'DISEÑO ORIENTADO AL DOMINIO',
    'OBSERVABILIDAD & CI/CD',
  ],
  en: [
    'CLEAN ARCHITECTURE',
    'SOLID PRINCIPLES',
    'INFRASTRUCTURE AS CODE',
    'DOMAIN-DRIVEN DESIGN',
    'OBSERVABILITY & CI/CD',
  ],
}

function CornerAccent({ position, delay }) {
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none absolute z-20 ${position}`}
    >
      <motion.span
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
        className="block text-xs leading-none text-neutral-400 select-none"
      >
        +
      </motion.span>
    </motion.span>
  )
}

function BragTag() {
  const { lang } = useLanguage()
  const phrases = BRAG[lang]
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % phrases.length)
    }, 3200)
    return () => clearInterval(id)
  }, [phrases.length])

  const phrase = phrases[i % phrases.length]

  return (
    <div className="pointer-events-none absolute bottom-5 right-5 z-20 hidden items-center gap-2 sm:right-8 sm:flex md:bottom-8">
      <motion.span
        animate={{ opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
      />
      <AnimatePresence mode="wait">
        <motion.span
          key={`${lang}-${phrase}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
        >
          {phrase}
        </motion.span>
      </AnimatePresence>
    </div>
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
      className="relative flex min-h-screen items-center justify-center px-3 py-6 sm:px-4 md:px-6 md:py-10"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 flex min-h-[72vh] w-full max-w-5xl flex-col rounded-3xl bg-white shadow-[0_0_80px_-10px_rgba(255,255,255,0.08),0_25px_60px_-15px_rgba(0,0,0,0.5)] before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-white before:blur-2xl before:opacity-30"
      >
        {/* Corner registration marks + rotating confidence tag */}
        <CornerAccent position="top-4 left-4" delay={0.6} />
        <CornerAccent position="top-4 right-4" delay={0.7} />
        <CornerAccent position="bottom-4 left-4" delay={0.8} />
        <CornerAccent position="bottom-4 right-4" delay={0.9} />
        <BragTag />

        <Navbar />

        <div className="flex flex-1 flex-col justify-between px-5 pb-6 pt-4 sm:px-8 sm:pb-8 md:px-10 md:pb-10 md:pt-6 lg:px-16">
          {/* Top row: stack icons (left) + description (right) */}
          <div className="grid grid-cols-1 gap-6 pt-6 sm:gap-8 sm:pt-8 md:grid-cols-2 md:gap-12 md:pt-10 lg:gap-16">
            {/* Stack icons — left column */}
            <div className="flex flex-col">
              <span className="mb-4 block text-sm sm:text-base text-neutral-400">(Stack)</span>
              <ul className="flex flex-wrap items-start gap-4 sm:gap-5 md:gap-6 lg:gap-8">
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
                <motion.div
                  key={lang}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-3.5"
                >
                  {DESC_BLOCKS.map((key) => {
                    const block = t[key]
                    return (
                      <div key={key}>
                        <span className="mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: block.dot }} />
                          {block.label}
                        </span>
                        <p className="text-[13px] leading-relaxed text-neutral-500">{block.text}</p>
                      </div>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Name — bottom */}
          <div>
            <span className="mb-2 block text-sm text-neutral-400">(2)</span>
            <h1 className="font-serif text-[clamp(1.8rem,6vw,7.5rem)] leading-[0.85] tracking-tight text-neutral-900">
              Juan Manuel<br />Gonzalez
            </h1>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-3 text-white/50"
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
