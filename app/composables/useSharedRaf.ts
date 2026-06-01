type RafCallback = (now: DOMHighResTimeStamp) => void

const subscribers = new Set<RafCallback>()
let rafId: number | null = null

const tick = (now: DOMHighResTimeStamp) => {
  for (const cb of subscribers) cb(now)
  rafId = requestAnimationFrame(tick)
}

export const useSharedRaf = (cb: RafCallback) => {
  onMounted(() => {
    subscribers.add(cb)
    if (rafId === null) rafId = requestAnimationFrame(tick)
  })

  onUnmounted(() => {
    subscribers.delete(cb)
    if (subscribers.size === 0 && rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  })
}
