<script setup lang="ts">
const preEl = ref<HTMLPreElement>()
const frame = ref('')
const scaleFactor = ref(1)

let A = 1.0
let B = 0.5
let rafId: number
let naturalW = 0
let naturalH = 0

const COLS = 120
const ROWS = 40
const CHARS = '.,-~:;=!*#$@'

function renderDonut() {
  const z = new Float32Array(COLS * ROWS)
  const b: string[] = new Array(COLS * ROWS).fill(' ')
  const sinA = Math.sin(A),
    cosA = Math.cos(A)
  const sinB = Math.sin(B),
    cosB = Math.cos(B)

  for (let j = 0; j < Math.PI * 2; j += 0.07) {
    const sinJ = Math.sin(j),
      cosJ = Math.cos(j)
    for (let i = 0; i < Math.PI * 2; i += 0.02) {
      const sinI = Math.sin(i),
        cosI = Math.cos(i)
      const h = cosJ + 2
      const D = 1 / (sinI * h * sinA + sinJ * cosA + 5)
      const t = sinI * h * cosA - sinJ * sinA
      const x = Math.floor(COLS / 2 + 50 * D * (cosI * h * cosB - t * sinB))
      const y = Math.floor(ROWS / 2 + 25 * D * (cosI * h * sinB + t * cosB))
      if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
        const idx = x + COLS * y
        if (D > z[idx]) {
          z[idx] = D
          const lum =
            (sinJ * sinA - sinI * cosJ * cosA) * cosB -
            sinI * cosJ * sinA -
            sinJ * cosA -
            cosI * cosJ * sinB
          b[idx] = CHARS[Math.max(0, Math.floor(8 * lum)) % CHARS.length]
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

function calcScale() {
  if (!naturalW) return
  const sx = (window.innerWidth * 1.15) / naturalW
  const sy = (window.innerHeight * 1.15) / naturalH
  scaleFactor.value = Math.max(sx, sy)
}

function loop() {
  A += 0.005
  B += 0.003
  renderDonut()
  rafId = requestAnimationFrame(loop)
}

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
    rafId = requestAnimationFrame(loop)
  })
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', calcScale)
})
</script>

<template>
  <div
    class="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center"
  >
    <pre
      ref="preEl"
      class="select-none whitespace-pre leading-[1.4]"
      :style="{
        fontFamily: '\'JetBrains Mono\', monospace',
        fontSize: '14px',
        color: '#7dd3fc',
        opacity: 0.1,
        transform: `scale(${scaleFactor})`,
        transformOrigin: 'center',
        willChange: 'transform',
      }"
      >{{ frame }}</pre
    >
  </div>
</template>
