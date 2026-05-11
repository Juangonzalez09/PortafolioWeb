import { motion, useScroll, useTransform } from 'framer-motion'
import { useMemo } from 'react'

const SOLVED_COLORS = {
  front: '#C41E3A',
  back: '#FF5800',
  left: '#0051BA',
  right: '#009E60',
  top: '#FFD500',
  bottom: '#FFFFFF',
}

const FACE_KEYS = ['front', 'back', 'left', 'right', 'top', 'bottom']
const ALL_COLORS = Object.values(SOLVED_COLORS)

const MINI_SIZE = 14
const GAP = 2
const FACE_SIZE = MINI_SIZE * 3 + GAP * 2

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

const SOLVE_ORDER = [4, 1, 3, 5, 7, 0, 2, 6, 8]

function buildCubeData() {
  const rand = seededRandom(42)
  const pool = []
  ALL_COLORS.forEach((c) => {
    for (let i = 0; i < 9; i++) pool.push(c)
  })
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }

  const data = []
  FACE_KEYS.forEach((face, fi) => {
    const solvedColor = SOLVED_COLORS[face]
    const faceStart = 0.05 + fi * 0.12
    SOLVE_ORDER.forEach((cellIdx, orderIdx) => {
      const solveAt = faceStart + orderIdx * 0.015
      data.push({
        face,
        faceIndex: fi,
        cellIndex: cellIdx,
        scrambledColor: pool[fi * 9 + cellIdx],
        solvedColor,
        solveAt: Math.min(solveAt, 0.85),
      })
    })
  })

  return data
}

const CUBE_DATA = buildCubeData()

function SolvingCell({ scrambledColor, solvedColor, solveAt, scrollYProgress }) {
  const t0 = Math.max(solveAt - 0.04, 0)
  const t1 = solveAt

  const color = useTransform(scrollYProgress, [t0, t1], [scrambledColor, solvedColor])
  const flip = useTransform(scrollYProgress, [t0, t1], [0, 360])

  return (
    <motion.div
      className="rounded-[2px]"
      style={{
        width: MINI_SIZE,
        height: MINI_SIZE,
        backgroundColor: color,
        boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)',
        rotateY: flip,
      }}
    />
  )
}

function Face({ faceKey, faceIndex, transform, scrollYProgress }) {
  const cells = useMemo(
    () => CUBE_DATA.filter((d) => d.faceIndex === faceIndex).sort((a, b) => a.cellIndex - b.cellIndex),
    [faceIndex]
  )

  return (
    <div
      className="absolute grid grid-cols-3"
      style={{
        width: FACE_SIZE,
        height: FACE_SIZE,
        gap: GAP,
        transform,
        backfaceVisibility: 'hidden',
      }}
    >
      {cells.map((cell) => (
        <SolvingCell
          key={cell.cellIndex}
          scrambledColor={cell.scrambledColor}
          solvedColor={cell.solvedColor}
          solveAt={cell.solveAt}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  )
}

export default function RubikCube() {
  const { scrollYProgress } = useScroll()

  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 385])
  const rotateY = useTransform(scrollYProgress, [0, 1], [-35, 325])

  const half = FACE_SIZE / 2

  const faces = [
    { key: 'front', transform: `translateZ(${half}px)` },
    { key: 'back', transform: `translateZ(-${half}px) rotateY(180deg)` },
    { key: 'left', transform: `translateX(-${half}px) rotateY(-90deg)` },
    { key: 'right', transform: `translateX(${half}px) rotateY(90deg)` },
    { key: 'top', transform: `translateY(-${half}px) rotateX(90deg)` },
    { key: 'bottom', transform: `translateY(${half}px) rotateX(-90deg)` },
  ]

  return (
    <div
      className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8"
      style={{ perspective: 400 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          width: FACE_SIZE,
          height: FACE_SIZE,
        }}
        className="relative"
      >
        {faces.map((face, i) => (
          <Face
            key={face.key}
            faceKey={face.key}
            faceIndex={i}
            transform={face.transform}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </motion.div>
    </div>
  )
}
