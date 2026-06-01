<script setup lang="ts">
const config = useRuntimeConfig()
const projectsRef = ref<HTMLElement>()
const emailHref = ref('')
const time = ref('')
const cpu = ref(0)
const ram = ref<string | null>(null)

let frameCount = 0
let fpsWindowStart = 0
let maxFps = 60
let timeInterval: ReturnType<typeof setInterval>

useSharedRaf((now) => {
  if (!fpsWindowStart) fpsWindowStart = now
  frameCount++
  const elapsed = now - fpsWindowStart
  if (elapsed >= 1000) {
    const fps = (frameCount * 1000) / elapsed
    if (fps > maxFps) maxFps = fps
    const load = Math.max(0, 1 - fps / maxFps)
    const wave = 0.04 + 0.03 * Math.sin(now * 0.001) + 0.02 * Math.sin(now * 0.0007 + 1)
    cpu.value = Math.round(Math.max(1, Math.min(99, (load + wave) * 100)))
    frameCount = 0
    fpsWindowStart = now
  }
})

const updateTime = () => {
  time.value = new Date().toLocaleTimeString('en-GB')
  const heap = (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize
  if (heap) ram.value = `${Math.round(heap / 1024 / 1024)}mb`
}

onMounted(() => {
  emailHref.value = `mailto:${atob(config.public.emailB64)}`
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => clearInterval(timeInterval))

const scrollToProjects = () => {
  projectsRef.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="bg-gh-bg min-h-screen">
    <AsciiBackground />

    <!-- statusbar -->
    <header
      class="fixed top-0 inset-x-0 z-50 h-8 flex items-center justify-between px-4 bg-gh-surface border-b border-gh-border text-xs text-gh-muted"
    >
      <div class="flex items-center gap-3">
        <span class="text-gh-text tabular-nums">{{ time }}</span>
        <span class="text-gh-border select-none">|</span>
        <span>cpu <span class="text-gh-text tabular-nums">{{ cpu }}%</span></span>
        <template v-if="ram">
          <span class="text-gh-border select-none">|</span>
          <span>ram <span class="text-gh-text">{{ ram }}</span></span>
        </template>
      </div>
      <nav class="flex items-center gap-3">
        <a
          :href="`https://github.com/${config.public.githubUsername}`"
          target="_blank"
          rel="noopener"
          class="hover:text-gh-text transition-colors duration-200"
          >github</a
        >
        <span class="text-gh-border select-none">|</span>
        <a
          v-if="emailHref"
          :href="emailHref"
          class="hover:text-gh-text transition-colors duration-200"
          >email</a
        >
      </nav>
    </header>

    <!-- hero -->
    <section class="relative z-10 flex min-h-screen flex-col items-center justify-center">
      <div class="text-center px-4">
        <p class="text-gh-muted text-xs tracking-widest mb-8">
          <span class="text-gh-accent">></span> Michał Łuczyński
        </p>
        <h1 class="text-[clamp(3rem,12vw,8rem)] font-bold tracking-tight text-gh-text">
          Luminaire<span class="text-gh-accent">.</span>
        </h1>
        <p class="text-gh-muted text-sm mt-6">
          <span class="text-gh-border">[</span>software engineer<span class="text-gh-border">]</span>
        </p>
      </div>

      <button
        class="absolute bottom-10 flex flex-col items-center gap-2 text-gh-muted hover:text-gh-accent transition-colors duration-300 cursor-pointer"
        @click="scrollToProjects"
      >
        <span class="text-[10px] tracking-[0.4em] uppercase">scroll</span>
        <Icon name="lucide:arrow-down" class="animate-bounce size-4" />
      </button>
    </section>

    <!-- projects -->
    <section ref="projectsRef" class="relative z-10 px-6 pt-24 pb-48 flex flex-col items-center">
      <div class="w-full max-w-3xl">
        <ProjectsSection />
      </div>
    </section>
  </div>
</template>
