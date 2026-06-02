<script setup lang="ts">
const config = useRuntimeConfig()
const projectsRef = ref<HTMLElement>()
const emailHref = ref('')

onMounted(() => {
  emailHref.value = `mailto:${atob(config.public.emailB64)}`
})

const scrollToProjects = () => {
  projectsRef.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="bg-gh-bg min-h-screen">
    <AsciiBackground />

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
        <nav class="flex items-center justify-center gap-4 mt-6 text-xs text-gh-muted">
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
