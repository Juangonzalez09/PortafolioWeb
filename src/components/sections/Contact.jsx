import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Navbar from '../Navbar'
import LangToggle from '../LangToggle'
import { useLanguage } from '../../context/LanguageContext'
import medellinImg from '../../assets/Medellin.jpg'
import contactoImg from '../../assets/Contacto.jpg'
import openToWorkImg from '../../assets/OpenToWork.jpg'

const CONTENT = {
  es: {
    intro: 'Si te interesa saber más de mí y contactarme — aquí estaré construyendo con propósito.',
    card1: {
      location: 'Medellín, Colombia',
      desc: 'Desde donde construyo soluciones con propósito.',
    },
    card2: {
      label: 'Contacto',
      desc: 'Conectemos y hablemos de tecnología.',
    },
    card3: {
      label: 'Open to Work',
      desc: 'Siempre abierto a conocer personas nuevas con ideas y proyectos que aporten a mi crecimiento profesional.',
    },
  },
  en: {
    intro: "If you're interested in knowing more about me and reaching out — I'll be here building with purpose.",
    card1: {
      location: 'Medellín, Colombia',
      desc: 'Where I build purposeful solutions from.',
    },
    card2: {
      label: 'Contact',
      desc: "Let's connect and talk about technology.",
    },
    card3: {
      label: 'Open to Work',
      desc: 'Always open to meeting new people with ideas and projects that contribute to my professional growth.',
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] }

export default function Contact() {
  const ref = useRef(null)
  const { lang } = useLanguage()
  const t = CONTENT[lang]

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  const cardY = useTransform(scrollYProgress, [0, 1], [120, 0])
  const cardOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])

  return (
    <section
      ref={ref}
      id="contact"
      data-section="contact"
      className="relative flex min-h-screen items-center justify-center px-6 py-10"
    >
      <motion.div
        style={{ y: cardY, opacity: cardOpacity }}
        className="relative z-10 flex w-full max-w-5xl flex-col rounded-3xl bg-white shadow-[0_0_80px_-10px_rgba(255,255,255,0.08),0_25px_60px_-15px_rgba(0,0,0,0.5)] before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-white before:blur-2xl before:opacity-30 overflow-hidden"
      >
        <Navbar />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
          className="px-10 pb-12 pt-4 md:px-16"
        >
          {/* Header */}
          <motion.div variants={fadeUp} transition={transition} className="mb-10 flex items-start justify-between">
            <div>
              <span className="mb-3 block text-base text-neutral-400">(Contact)</span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={lang}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-sm text-base leading-relaxed text-neutral-700"
                >
                  {t.intro}
                </motion.p>
              </AnimatePresence>
            </div>
            <LangToggle />
          </motion.div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Card 1 — Medellín */}
            <motion.div variants={fadeUp} transition={transition}>
              <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-neutral-200">
                <img src={medellinImg} alt="Medellín, Colombia" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-medium text-white/70">{t.card1.location}</span>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-xs text-neutral-400">({t.card1.location})</span>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={lang}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-1 text-sm text-neutral-900"
                  >
                    {t.card1.desc}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Card 2 — Contact links */}
            <motion.div variants={fadeUp} transition={transition}>
              <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-neutral-200">
                <img src={contactoImg} alt="Contact" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <div className="mt-3">
                <span className="text-xs text-neutral-400">({t.card2.label})</span>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={lang}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-1 text-sm text-neutral-900"
                  >
                    {t.card2.desc}
                  </motion.p>
                </AnimatePresence>
                <ul className="mt-3 flex flex-col gap-1 text-sm text-neutral-900">
                  <li>
                    <a
                      href="https://www.linkedin.com/in/juan-manuel-gonzalez-2940b4199/"
                      target="_blank"
                      rel="noreferrer"
                      className="group/link inline-flex items-center gap-1 transition-colors hover:text-neutral-500"
                    >
                      linkedin
                      <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:gonzalezjuanm58@gmail.com"
                      className="group/link inline-flex items-center gap-1 transition-colors hover:text-neutral-500"
                    >
                      gonzalezjuanm58@gmail.com
                      <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/Juangonzalez09"
                      target="_blank"
                      rel="noreferrer"
                      className="group/link inline-flex items-center gap-1 transition-colors hover:text-neutral-500"
                    >
                      github
                      <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Card 3 — Open to work */}
            <motion.div variants={fadeUp} transition={transition}>
              <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-neutral-200">
                <img src={openToWorkImg} alt="Open to Work" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <div className="mt-3">
                <span className="text-xs text-neutral-400">({t.card3.label})</span>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={lang}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-1 text-sm font-medium text-neutral-900"
                  >
                    {t.card3.desc}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Footer credits */}
          <motion.div variants={fadeUp} transition={transition} className="mt-12 border-t border-neutral-100 pt-6">
            <p className="text-xs text-neutral-400 text-center">
              Designed & built by Juan Manuel Gonzalez · © {new Date().getFullYear()} Juanmax
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
