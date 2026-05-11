import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import useActiveSection from '../../hooks/useActiveSection'
import { useLanguage } from '../../context/LanguageContext'
import { FaAws } from 'react-icons/fa6'
import { SiPython, SiReact, SiAngular, SiApacheairflow } from 'react-icons/si'
import { VscAzureDevops } from 'react-icons/vsc'
import { FaGithub } from 'react-icons/fa'
import { TbSql, TbServer } from 'react-icons/tb'
import { FaNodeJs } from 'react-icons/fa'
import previewVideo from '../../assets/preview.mp4.mp4'

function useCurrentTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    function update() {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      const s = String(now.getSeconds()).padStart(2, '0')
      const offset = -now.getTimezoneOffset() / 60
      const sign = offset >= 0 ? '+' : ''
      setTime(`${h}:${m}:${s} (UTC${sign}${offset})`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

const PROJECTS = [
  {
    id: 1,
    video: previewVideo,
    es: {
      leftDesc: 'Experiencia a nivel empresarial en proyectos del lado del servidor, procesos ETL, SQL Server y arquitectura en la nube. Como freelancer, desarrollo de soluciones web para pequeñas y medianas empresas.',
      topLeft: {
        label: 'DATA ENGINEERING',
        lines: [
          'AWS DATA LAKES',
          'ETL PIPELINES',
          'GLUE / ATHENA / S3',
        ],
        icons: [FaAws, SiApacheairflow],
      },
      topRight: {
        label: 'CI/CD & DEVOPS',
        lines: [
          'GITHUB',
          'AZURE PIPELINES',
          'AUTOMATED DEPLOYMENTS',
        ],
        icons: [FaGithub, VscAzureDevops],
      },
      bottomLeft: {
        label: 'FULLSTACK DEV',
        lines: [
          'REACT / ANGULAR',
          'NODE.JS / PYTHON',
          'REST APIs & MICROSERVICES',
        ],
        icons: [SiReact, SiAngular, FaNodeJs, SiPython],
      },
      bottomRight: {
        label: 'INFRASTRUCTURE',
        lines: [
          'SQL SERVER / POSTGRESQL',
          'SERVER ADMINISTRATION',
          'CLOUD SERVICE DEPLOYMENTS',
        ],
        icons: [TbSql, TbServer],
      },
    },
    en: {
      leftDesc: 'Enterprise-level experience in server-side projects, ETL processes, SQL Server and cloud architecture. As a freelancer, building web solutions for small and medium businesses.',
      topLeft: {
        label: 'DATA ENGINEERING',
        lines: [
          'AWS DATA LAKES',
          'ETL PIPELINES',
          'GLUE / ATHENA / S3',
        ],
        icons: [FaAws, SiApacheairflow],
      },
      topRight: {
        label: 'CI/CD & DEVOPS',
        lines: [
          'GITHUB',
          'AZURE PIPELINES',
          'AUTOMATED DEPLOYMENTS',
        ],
        icons: [FaGithub, VscAzureDevops],
      },
      bottomLeft: {
        label: 'FULLSTACK DEV',
        lines: [
          'REACT / ANGULAR',
          'NODE.JS / PYTHON',
          'REST APIs & MICROSERVICES',
        ],
        icons: [SiReact, SiAngular, FaNodeJs, SiPython],
      },
      bottomRight: {
        label: 'INFRASTRUCTURE',
        lines: [
          'SQL SERVER / POSTGRESQL',
          'SERVER ADMINISTRATION',
          'CLOUD SERVICE DEPLOYMENTS',
        ],
        icons: [TbSql, TbServer],
      },
    },
  },
]

function ProjectCard({ project, isFirst, isLast }) {
  const [hovered, setHovered] = useState(false)
  const { lang } = useLanguage()
  const content = project[lang]
  const time = useCurrentTime()
  const activeSection = useActiveSection('index')

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white">
      {/* Expanded background video on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-[2]"
          >
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover blur-[2px] brightness-[0.35]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.nav
        animate={{
          color: hovered ? '#ffffff' : '#171717',
        }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-8 pb-4 sm:px-6 sm:pt-10 md:px-10 md:pt-14 md:pb-6 lg:px-16"
      >
        <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-tight shrink-0">
          juanmax <sup className="text-[7px] sm:text-[8px] md:text-xs">™</sup>
        </span>

        <ul className="absolute left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 md:gap-3 text-[9px] sm:text-xs md:text-sm font-medium">
          {[
            { id: 'index', label: '(Index)' },
            { id: 'about', label: '(About)' },
            { id: 'projects', label: '(Projects & Stack)' },
            { id: 'contact', label: '(Contact)' },
          ].map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`transition-opacity ${
                  activeSection === link.id ? 'opacity-50' : 'hover:opacity-60'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <span className="hidden sm:block text-xs md:text-sm font-medium tabular-nums shrink-0">
          {time}
        </span>
      </motion.nav>

      {/* Previous label — for non-first cards */}
      {!isFirst && (
        <motion.span
          animate={{ color: hovered ? 'rgba(255,255,255,0.7)' : '#171717' }}
          transition={{ duration: 0.4 }}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:left-6 md:left-10 lg:left-16"
        >
          (Previous)
        </motion.span>
      )}

      {/* Next label — for non-last cards, positioned right */}
      {!isLast && (
        <motion.span
          animate={{ color: hovered ? 'rgba(255,255,255,0.7)' : '#171717' }}
          transition={{ duration: 0.4 }}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:right-6 md:right-10 lg:right-16"
        >
          (Next)
        </motion.span>
      )}

      {/* Watermark */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 0.08, filter: hovered ? 'blur(0px)' : 'blur(3px)' }}
        transition={{ duration: 0.4 }}
        className="pointer-events-none absolute bottom-4 left-3 z-[1] overflow-hidden sm:bottom-6 sm:left-4 md:bottom-12 md:left-12"
        style={{ filter: 'blur(3px)' }}
      >
        <span className="block text-[clamp(3rem,12vw,13rem)] italic leading-[0.9] tracking-[-0.02em] text-neutral-900 select-none" style={{ fontFamily: "'DM Serif Display', serif" }}>
          Juan
        </span>
        <span className="block text-[clamp(3rem,12vw,13rem)] italic leading-[0.9] tracking-[-0.02em] text-neutral-900 select-none" style={{ fontFamily: "'DM Serif Display', serif" }}>
          Manuel
        </span>
      </motion.div>

      {/* Top-left — Data Engineering */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-4 top-20 z-10 sm:left-6 sm:top-24 md:left-10 md:top-28 lg:left-16"
          >
            <span className="mb-2 block text-[8px] sm:text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
              {content.topLeft.label}
            </span>
            {content.topLeft.lines.map((line, i) => (
              <p key={i} className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.08em] text-white leading-snug">
                {line}
              </p>
            ))}
            <div className="mt-3 flex items-center gap-3">
              {content.topLeft.icons.map((Icon, i) => (
                <Icon key={i} size={18} className="text-white/60" />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top-right — CI/CD & DevOps */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-4 top-20 z-10 text-right sm:right-6 sm:top-24 md:right-10 md:top-28 lg:right-16"
          >
            <span className="mb-2 block text-[8px] sm:text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
              {content.topRight.label}
            </span>
            {content.topRight.lines.map((line, i) => (
              <p key={i} className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.08em] text-white leading-snug">
                {line}
              </p>
            ))}
            <div className="mt-3 flex items-center justify-end gap-3">
              {content.topRight.icons.map((Icon, i) => (
                <Icon key={i} size={18} className="text-white/60" />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left description — between top and bottom */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 max-w-[10rem] sm:max-w-[14rem] md:max-w-[18rem] sm:left-6 md:left-10 lg:left-16 lg:max-w-[22rem]"
          >
            <p className="text-[11px] leading-relaxed text-white/50">
              {content.leftDesc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-left — Fullstack Dev */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-8 left-4 z-10 sm:bottom-12 sm:left-6 md:bottom-16 md:left-10 lg:left-16"
          >
            <span className="mb-2 block text-[8px] sm:text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
              {content.bottomLeft.label}
            </span>
            {content.bottomLeft.lines.map((line, i) => (
              <p key={i} className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.08em] text-white leading-relaxed">
                {line}
              </p>
            ))}
            <div className="mt-3 flex items-center gap-3">
              {content.bottomLeft.icons.map((Icon, i) => (
                <Icon key={i} size={16} className="text-white/60" />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-right — Infrastructure */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-8 right-4 z-10 text-right sm:bottom-12 sm:right-6 md:bottom-16 md:right-10 lg:right-16"
          >
            <span className="mb-2 block text-[8px] sm:text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
              {content.bottomRight.label}
            </span>
            {content.bottomRight.lines.map((line, i) => (
              <p key={i} className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.08em] text-white leading-relaxed">
                {line}
              </p>
            ))}
            <div className="mt-3 flex items-center justify-end gap-3">
              {content.bottomRight.icons.map((Icon, i) => (
                <Icon key={i} size={16} className="text-white/60" />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Label above video */}
      <AnimatePresence>
        {!hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute z-10 flex flex-col items-center gap-2"
            style={{ top: 'calc(50% - 14.5rem)', left: '50%', transform: 'translateX(-50%)' }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              (latest work)
            </span>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400"
            >
              hover here
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center video card */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{
          scale: hovered ? 0.98 : 1,
          boxShadow: hovered
            ? '0 30px 100px -15px rgba(0,0,0,0.7)'
            : '0 15px 50px -10px rgba(0,0,0,0.25)',
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 aspect-square w-44 cursor-pointer overflow-hidden sm:w-56 md:w-64 lg:w-[22rem]"
      >
        <video
          src={project.video}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-black/15"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
                (View)
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start center'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [80, 0])

  return (
    <section
      ref={ref}
      id="projects"
      data-section="projects"
      className="relative"
    >
      <motion.div style={{ opacity, y }}>
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            isFirst={i === 0}
            isLast={i === PROJECTS.length - 1}
          />
        ))}
      </motion.div>
    </section>
  )
}
