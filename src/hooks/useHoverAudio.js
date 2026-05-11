import { useRef, useCallback } from 'react'

const FADE_MS = 600

export default function useHoverAudio(src, { volume = 0.35, startAt = 0 } = {}) {
  const audioRef = useRef(null)
  const fadeTimer = useRef(null)

  // Lazy init — create audio only on first hover (avoids StrictMode & reload issues)
  const getAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0
    audio.preload = 'auto'
    if (startAt > 0) audio.currentTime = startAt
    audioRef.current = audio
    return audio
  }, [src, startAt])

  const fadeTo = useCallback((audio, target) => {
    cancelAnimationFrame(fadeTimer.current)
    const start = audio.volume
    const startTime = performance.now()

    function tick(now) {
      const elapsed = now - startTime
      const t = Math.min(elapsed / FADE_MS, 1)
      const eased = t * (2 - t)
      audio.volume = Math.max(0, Math.min(1, start + (target - start) * eased))
      if (t < 1) {
        fadeTimer.current = requestAnimationFrame(tick)
      } else if (target === 0) {
        audio.pause()
      }
    }
    fadeTimer.current = requestAnimationFrame(tick)
  }, [])

  const onEnter = useCallback(() => {
    const audio = getAudio()
    audio.volume = 0
    audio.play()
      .then(() => fadeTo(audio, volume))
      .catch(() => {})
  }, [getAudio, fadeTo, volume])

  const onLeave = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    fadeTo(audio, 0)
  }, [fadeTo])

  return { onEnter, onLeave }
}
