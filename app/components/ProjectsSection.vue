<script setup lang="ts">
interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  fork: boolean
}

const config = useRuntimeConfig()
const rootEl = ref<HTMLElement>()

const {
  data: repos,
  status,
  error,
  execute,
} = useFetch<Repo[]>(`https://api.github.com/users/${config.public.githubUsername}/repos`, {
  query: { sort: 'pushed', per_page: 12 },
  server: false,
  immediate: false,
})

onMounted(() => {
  const observer = new IntersectionObserver(
    async (entries) => {
      if (entries[0].isIntersecting) {
        if (import.meta.dev) await new Promise((r) => setTimeout(r, 2000))
        execute()
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )
  if (rootEl.value) observer.observe(rootEl.value)
})

const filtered = computed(() => repos.value?.filter((r) => !r.fork).slice(0, 6) ?? [])

const langColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Vue: '#41b883',
  Python: '#3572a5',
  Go: '#00add8',
  Rust: '#dea584',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Svelte: '#ff3e00',
  Kotlin: '#a97bff',
  'C#': '#178600',
  'C++': '#f34b7d',
  C: '#555555',
  Java: '#b07219',
  Ruby: '#701516',
  PHP: '#4f5d95',
  Shell: '#89e051',
  PowerShell: '#012456',
  Dockerfile: '#384d54',
  Lua: '#000080',
  Nix: '#7e7eff',
  Zig: '#ec915c',
}
</script>

<template>
  <div ref="rootEl">
    <div class="mb-12 text-center">
      <h2 class="text-2xl font-semibold text-white tracking-tight">projects</h2>
      <p class="text-sky-300/50 text-xs mt-1 tracking-[0.25em]">recent work · via github</p>
    </div>

    <!-- skeleton (idle = not yet in view, pending = fetching) -->
    <div
      v-if="status === 'idle' || status === 'pending'"
      class="flex flex-wrap justify-center gap-4"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="h-36 w-full sm:w-72 rounded-lg border border-sky-300/25 bg-sky-300/15 animate-pulse"
      />
    </div>

    <!-- error -->
    <p v-else-if="error" class="text-sky-300/40 text-sm text-center">
      couldn't reach github. &nbsp;
      <a
        :href="`https://github.com/${config.public.githubUsername}`"
        target="_blank"
        rel="noopener"
        class="underline underline-offset-4 hover:text-sky-300 transition-colors"
        >view profile instead →</a
      >
    </p>

    <!-- cards -->
    <TransitionGroup
      v-else
      name="fade-up"
      appear
      tag="div"
      class="flex flex-wrap justify-center gap-4"
    >
      <a
        v-for="(repo, i) in filtered"
        :key="repo.id"
        :href="repo.html_url"
        target="_blank"
        rel="noopener noreferrer"
        :style="{ animationDelay: `${i * 60}ms` }"
        class="group flex flex-col justify-between p-6 rounded-lg border border-sky-300/20 bg-sky-300/[0.04] hover:border-sky-300/40 hover:bg-sky-300/[0.08] transition-all duration-300 w-full sm:w-72"
      >
        <div>
          <h3
            class="text-sm font-medium text-white group-hover:text-sky-100 transition-colors truncate"
          >
            {{ repo.name }}
          </h3>
          <p class="mt-2 text-xs text-sky-100/50 leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {{ repo.description || '—' }}
          </p>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span
              v-if="repo.language"
              class="inline-block w-2 h-2 rounded-full shrink-0"
              :style="{ backgroundColor: langColors[repo.language] ?? '#7dd3fc' }"
            />
            <span class="text-xs text-sky-300/50">{{ repo.language ?? '' }}</span>
          </div>
          <span v-if="repo.stargazers_count > 0" class="text-xs text-sky-300/40">
            ★ {{ repo.stargazers_count }}
          </span>
        </div>
      </a>
    </TransitionGroup>
  </div>
</template>
