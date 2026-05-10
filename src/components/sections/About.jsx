import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Navbar from '../Navbar'
import LangToggle from '../LangToggle'
import { useLanguage } from '../../context/LanguageContext'
import portraitImg from '../../assets/portrait.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] }

const ABOUT_CONTENT = {
  es: {
    p1: 'Soy un ingeniero de software joven, apasionado por la tecnología y por construir soluciones con propósito. Mi enfoque está en el desarrollo backend, la ingeniería de datos y la arquitectura en la nube — diseñando sistemas robustos, escalables y elegantes en su simplicidad.',
    p2: 'Trabajo principalmente con AWS, Python, Node.js y Spark, complementados con bases sólidas en redes y administración de servidores. Cada proyecto es una oportunidad para evolucionar, mezclar disciplinas y crear soluciones donde la precisión se encuentra con el propósito.',
    p3: 'Soy el tipo de ingeniero que querrías en tu equipo — porque no hay nada mejor que trabajar con personas que aman lo que hacen y no ven su trabajo como una obligación, sino como un espacio para crear, aprender y crecer.',
  },
  en: {
    p1: "I'm a young software engineer, passionate about technology and building purposeful solutions. My focus lies in backend development, data engineering and cloud architecture — designing systems that are robust, scalable and elegant in their simplicity.",
    p2: 'I work primarily with AWS, Python, Node.js and Spark, complemented by strong foundations in networking and server management. Every project is an opportunity to evolve, blend disciplines, and craft solutions where precision meets purpose.',
    p3: "I'm the kind of engineer you'd want on your team — because there's nothing better than working with people who love what they do, and who see their work not as an obligation, but as a space to create, learn and grow.",
  },
}

export default function About() {
  const ref = useRef(null)
  const { lang } = useLanguage()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  const cardY = useTransform(scrollYProgress, [0, 1], [120, 0])
  const cardOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])

  const content = ABOUT_CONTENT[lang]

  return (
    <section
      ref={ref}
      id="about"
      data-section="about"
      className="relative flex min-h-screen items-center justify-center px-6 py-10"
    >
      <motion.div
        style={{ y: cardY, opacity: cardOpacity }}
        className="relative z-10 flex min-h-[85vh] w-full max-w-5xl flex-col rounded-3xl bg-white shadow-[0_0_80px_-10px_rgba(255,255,255,0.08),0_25px_60px_-15px_rgba(0,0,0,0.5)] before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-white before:blur-2xl before:opacity-30"
      >
        <Navbar />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
          className="grid flex-1 grid-cols-1 gap-10 px-10 pb-10 pt-6 md:grid-cols-2 md:gap-16 md:px-16"
        >
          {/* Image column */}
          <motion.div variants={fadeUp} transition={transition} className="flex items-start">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-200 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-neutral-900/10 before:blur-2xl"
            >
              <img
                src={portraitImg}
                alt="Juan Manuel Gonzalez"
                className="h-full w-full object-cover grayscale-[15%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(255,255,255,0.15)]" />
            </motion.div>
          </motion.div>

          {/* Content column */}
          <div className="flex flex-col gap-10">
            <motion.div variants={fadeUp} transition={transition}>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-base text-neutral-400">(About)</span>
                <LangToggle />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={lang}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-base leading-relaxed text-neutral-700">{content.p1}</p>
                  <p className="mt-3 text-base leading-relaxed text-neutral-700">{content.p2}</p>
                  <p className="mt-3 text-base leading-relaxed text-neutral-900 font-medium">{content.p3}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div variants={fadeUp} transition={transition}>
              <span className="mb-3 block text-base text-neutral-400">(Credits)</span>
              <p className="text-base leading-relaxed text-neutral-700">
                Designed & built by Juan Manuel Gonzalez<br />
                Crafted with React, Vite & Tailwind CSS<br />
                © {new Date().getFullYear()} Juanmax
              </p>
            </motion.div>

            <motion.div variants={fadeUp} transition={transition}>
              <span className="mb-3 block text-base text-neutral-400">(Contact)</span>
              <ul className="flex flex-col gap-2 text-base text-neutral-900">
                <li>
                  <a
                    href="/cv.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 transition-colors hover:text-neutral-500"
                  >
                    download cv
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Juangonzalez09"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 transition-colors hover:text-neutral-500"
                  >
                    github
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/juan-manuel-gonzalez-2940b4199/"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 transition-colors hover:text-neutral-500"
                  >
                    linkedin
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
