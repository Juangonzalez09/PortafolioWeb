import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Navbar from '../Navbar'
import LangToggle from '../LangToggle'
import { useLanguage } from '../../context/LanguageContext'
import MacScreen from '../MacScreen'
import profileImg from '../../assets/profile.jpg'

const ABOUT_CONTENT = {
  es: {
    p1: 'Soy un ingeniero de software joven, apasionado por la tecnología y por construir soluciones con propósito. Mi enfoque está en la ingeniería cloud, la ingeniería de datos y las arquitecturas limpias, diseñando sistemas robustos, escalables y elegantes en su simplicidad.',
    p2: 'Trabajo principalmente con AWS, Python, Node.js y Spark, complementados con bases sólidas en redes y administración de servidores. Cada proyecto es una oportunidad para evolucionar, mezclar disciplinas y crear soluciones donde la precisión se encuentra con el propósito.',
    p3: 'Soy el tipo de ingeniero que querrías en tu equipo, porque no hay nada mejor que trabajar con personas que aman lo que hacen y no ven su trabajo como una obligación, sino como un espacio para crear, aprender y crecer.',
  },
  en: {
    p1: "I'm a young software engineer, passionate about technology and building purposeful solutions. My focus lies in cloud engineering, data engineering and clean architecture, designing systems that are robust, scalable and elegant in their simplicity.",
    p2: 'I work primarily with AWS, Python, Node.js and Spark, complemented by strong foundations in networking and server management. Every project is an opportunity to evolve, blend disciplines, and craft solutions where precision meets purpose.',
    p3: "I'm the kind of engineer you'd want on your team, because there's nothing better than working with people who love what they do, and who see their work not as an obligation, but as a space to create, learn and grow.",
  },
}

export default function About() {
  const ref = useRef(null)
  const { lang } = useLanguage()

  // Mac animation — scroll-pinned, 0 → 1 over the full tall section
  const { scrollYProgress: macProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Card entrance — fades in as the section enters viewport (prevents the
  // card from peeking through the bottom of the previous section)
  const { scrollYProgress: entranceProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })
  const cardY = useTransform(entranceProgress, [0, 1], [120, 0])
  const cardOpacity = useTransform(entranceProgress, [0, 0.6], [0, 1])

  const content = ABOUT_CONTENT[lang]

  return (
    <section
      ref={ref}
      id="about"
      data-section="about"
      className="relative"
      style={{ height: '600vh' }}
    >
      {/* Sticky stage — pins the card while the Mac animation plays */}
      <div className="sticky top-0 flex h-screen items-center justify-center px-3 py-6 sm:px-4 md:px-6 md:py-10">
        <motion.div
          style={{ y: cardY, opacity: cardOpacity }}
          className="relative z-10 flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-[0_0_80px_-10px_rgba(255,255,255,0.08),0_25px_60px_-15px_rgba(0,0,0,0.5)] before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-white before:blur-2xl before:opacity-30"
        >
          <Navbar />

          <div className="grid flex-1 grid-cols-1 gap-4 px-5 pb-4 pt-3 sm:gap-6 sm:px-8 sm:pb-6 md:grid-cols-2 md:gap-10 md:px-10 md:pb-6 md:pt-4 lg:gap-12 lg:px-12">
            {/* Mac column */}
            <div className="flex items-center">
              <MacScreen scrollYProgress={macProgress} />
            </div>

            {/* Content column */}
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative shrink-0">
                      <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-neutral-200 sm:h-11 sm:w-11">
                        <img
                          src={profileImg}
                          alt="Juan Manuel Gonzalez"
                          className="h-full w-full object-cover"
                          style={{ transform: 'scale(1.85)', transformOrigin: '50% 24%' }}
                        />
                      </div>
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </div>
                    <span className="text-sm text-neutral-400">(About)</span>
                  </div>
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
                    <p className="text-sm leading-relaxed text-neutral-700">{content.p1}</p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-700">{content.p2}</p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-900 font-medium">{content.p3}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div>
                <span className="mb-2 block text-sm text-neutral-400">(Credits)</span>
                <p className="text-sm leading-snug text-neutral-700">
                  Designed & built by Juan Manuel Gonzalez · © {new Date().getFullYear()} Juanmax
                </p>
              </div>

              <div>
                <span className="mb-2 block text-sm text-neutral-400">(Contact)</span>
                <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-neutral-900">
                  <li>
                    <a
                      href="/cv.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 transition-colors hover:text-neutral-500"
                    >
                      download cv
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
