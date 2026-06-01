<script setup lang="ts">
const preEl = ref<HTMLPreElement>()
const frame = ref('')
const scaleFactor = ref(1)

let A = 1.0
let B = 0.5
let naturalW = 0
let naturalH = 0

const COLS = 120
const ROWS = 40
const CHARS = '.,-~:;=!*#$@'
const CHARS_LEN = CHARS.length
const TOTAL = COLS * ROWS
const TWO_PI = Math.PI * 2

const z = new Float32Array(TOTAL)
const b: string[] = new Array(TOTAL).fill(' ')

const renderDonut = () => {
  z.fill(0)
  b.fill(' ')

  const sinA = Math.sin(A),
    cosA = Math.cos(A)
  const sinB = Math.sin(B),
    cosB = Math.cos(B)

  for (let j = 0; j < TWO_PI; j += 0.07) {
    const sinJ = Math.sin(j),
      cosJ = Math.cos(j)
    for (let i = 0; i < TWO_PI; i += 0.02) {
      const sinI = Math.sin(i),
        cosI = Math.cos(i)
      const h = cosJ + 2
      const D = 1 / (sinI * h * sinA + sinJ * cosA + 5)
      const t = sinI * h * cosA - sinJ * sinA
      const x = Math.floor(COLS / 2 + 50 * D * (cosI * h * cosB - t * sinB))
      const y = Math.floor(ROWS / 2 + 25 * D * (cosI * h * sinB + t * cosB))
      if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
        const idx = x + COLS * y
        if (D > z[idx]!) {
          z[idx] = D
          const lum =
            (sinJ * sinA - sinI * cosJ * cosA) * cosB -
            sinI * cosJ * sinA -
            sinJ * cosA -
            cosI * cosJ * sinB
          b[idx] = CHARS[Math.max(0, Math.floor(8 * lum)) % CHARS_LEN]!
        }
      }
    }
  }

  let out = ''
  for (let r = 0; r < ROWS; r++) {
    out += b.slice(r * COLS, (r + 1) * COLS).join('') + '\n'
  }
  frame.value = out
}

const calcScale = () => {
  if (!naturalW) return
  const sx = (window.innerWidth * 1.15) / naturalW
  const sy = (window.innerHeight * 1.15) / naturalH
  scaleFactor.value = Math.max(sx, sy)
}

useSharedRaf(() => {
  A += 0.005
  B += 0.003
  renderDonut()
})

onMounted(() => {
  renderDonut()
  nextTick(() => {
    if (preEl.value) {
      const rect = preEl.value.getBoundingClientRect()
      naturalW = rect.width
      naturalH = rect.height
      calcScale()
    }
    window.addEventListener('resize', calcScale)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', calcScale)
})
</script>

<template>
  <div
    aria-hidden="true"
    class="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center"
  >
    <pre
      ref="preEl"
      class="select-none whitespace-pre leading-[1.4] text-[14px] text-gh-accent opacity-[0.07] origin-center will-change-transform"
      :style="{ transform: `scale(${scaleFactor})` }"
      >{{ frame }}</pre
    >
  </div>
</template>
