import { useRef, useCallback, useEffect } from 'react'

const FADE_MS = 500

export default function useHoverAudio(src, { volume = 0.35, startAt = 0 } = {}) {
  const audioRef = useRef(null)
  const fadeRef = useRef(null)
  const wantRef = useRef(false) // whether we currently want to be playing

  // Create + preload the audio eagerly on mount so the first hover doesn't
  // have to wait on the network download (fixes the "takes a while" delay).
  // Also unlock playback on the first real user gesture: a hover is NOT a
  // user-activation gesture, so without this the browser autoplay policy can
  // silently reject the first play() (fixes "sometimes it just doesn't sound").
  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0
    audio.preload = 'auto'
    if (startAt > 0) audio.currentTime = startAt
    audio.load()
    audioRef.current = audio

    const unlock = () => {
      const a = audioRef.current
      if (!a) return
      // Play muted to satisfy the autoplay policy, then immediately pause
      // unless the pointer is already over the target.
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
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      cancelAnimationFrame(fadeRef.current)
      audio.pause()
      audioRef.current = null
    }
  }, [src, startAt])

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
    const audio = audioRef.current
    if (!audio) return
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
  }, [fade, volume])

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
