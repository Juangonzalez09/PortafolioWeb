import { useRef, useCallback, useEffect } from 'react'

const FADE_MS = 500

export default function useHoverAudio(src, { volume = 0.35, startAt = 0 } = {}) {
  const audioRef = useRef(null)
  const fadeRef = useRef(null)
  const wantRef = useRef(false) // whether we currently want to be playing

  // Lazily create + configure the audio element (no network cost until load()).
  const getAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current
    const audio = new Audio()
    audio.loop = true
    audio.volume = 0
    audio.preload = 'auto'
    audio.src = src
    if (startAt > 0) audio.currentTime = startAt
    audioRef.current = audio
    return audio
  }, [src, startAt])

  // Defer the (heavy) audio download until the browser is idle, so it never
  // competes with the initial page load — but it's still buffered well before
  // the user scrolls down to the Projects section. Also unlock playback on the
  // first real user gesture: a hover is NOT a user-activation gesture, so
  // without this the autoplay policy can silently reject the first play().
  useEffect(() => {
    const warm = () => getAudio().load()
    const idle =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback(warm, { timeout: 3000 })
        : setTimeout(warm, 1500)

    const unlock = () => {
      const a = getAudio()
      const p = a.play()
      if (p && typeof p.then === 'function') {
        p.then(() => {
          if (!wantRef.current) a.pause()
        }).catch(() => {})
      }
    }
    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })

    return () => {
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idle)
      else clearTimeout(idle)
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      cancelAnimationFrame(fadeRef.current)
      if (audioRef.current) audioRef.current.pause()
      audioRef.current = null
    }
  }, [getAudio])

  const fade = useCallback((target, onDone) => {
    const audio = audioRef.current
    if (!audio) return
    cancelAnimationFrame(fadeRef.current)
    const start = audio.volume
    const startTime = performance.now()

    const step = (now) => {
      const t = Math.min((now - startTime) / FADE_MS, 1)
      const eased = t * (2 - t)
      audio.volume = Math.max(0, Math.min(1, start + (target - start) * eased))
      if (t < 1) {
        fadeRef.current = requestAnimationFrame(step)
      } else if (onDone) {
        onDone()
      }
    }
    fadeRef.current = requestAnimationFrame(step)
  }, [])

  const onEnter = useCallback(() => {
    const audio = getAudio()
    wantRef.current = true
    const p = audio.play()
    if (p && typeof p.then === 'function') {
      p.then(() => {
        // Only fade up if the pointer is still over the target — guards against
        // the play() promise resolving after the user has already left.
        if (wantRef.current) fade(volume)
      }).catch(() => {})
    } else {
      fade(volume)
    }
  }, [getAudio, fade, volume])

  const onLeave = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    wantRef.current = false
    // Fade out, then pause once — but only if the pointer hasn't re-entered.
    fade(0, () => {
      if (!wantRef.current && audioRef.current) audioRef.current.pause()
    })
  }, [fade])

  return { onEnter, onLeave }
}
