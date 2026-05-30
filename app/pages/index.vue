<script setup lang="ts">
const projectsRef = ref<HTMLElement>()

function scrollToProjects() {
  projectsRef.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="bg-[#07070a] min-h-screen">
    <AsciiBackground />

    <!-- hero -->
    <section class="relative z-10 flex min-h-screen flex-col items-center justify-center">
      <div class="text-center px-4">
        <p class="text-sky-300/60 text-xs tracking-widest mb-8">Michał Łuczyński</p>
        <h1 class="text-7xl sm:text-9xl font-bold tracking-tight text-white">
          Luminaire<span class="text-sky-300">.</span>
        </h1>
        <p class="text-sky-200/90 text-sm mt-6">software engineer</p>
        <nav class="flex gap-8 justify-center mt-8 text-xs text-sky-300/80">
          <a
            href="https://github.com/Luminaire1337"
            target="_blank"
            rel="noopener"
            class="hover:text-sky-200 transition-colors duration-200"
            >github</a
          >
          <span class="text-sky-300/20">·</span>
          <a
            href="mailto:hi@matchlesslumi.dev"
            class="hover:text-sky-200 transition-colors duration-200"
            >email</a
          >
        </nav>
      </div>

      <button
        class="absolute bottom-10 flex flex-col items-center gap-2 text-sky-300/50 hover:text-sky-300/80 transition-colors duration-300 cursor-pointer"
        @click="scrollToProjects"
      >
        <span class="text-[10px] tracking-[0.4em] uppercase">scroll</span>
        <span class="animate-bounce text-base">↓</span>
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
