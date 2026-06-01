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
      if (entries[0]?.isIntersecting) {
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
    <!-- section header -->
    <div class="mb-12">
      <div class="flex items-center gap-3 mb-2">
        <span class="text-gh-accent text-xs select-none">[</span>
        <h2 class="text-sm font-semibold text-gh-text tracking-tight">projects</h2>
        <span class="text-gh-accent text-xs select-none">]</span>
        <div class="flex-1 h-px bg-gh-border" />
      </div>
      <p class="text-gh-muted text-xs tracking-[0.25em] flex items-center gap-2">
        recent work <span class="text-gh-border select-none">|</span> via github
      </p>
    </div>

    <!-- skeleton -->
    <div v-if="status === 'idle' || status === 'pending'" class="flex flex-wrap justify-center gap-4">
      <div
        v-for="i in 6"
        :key="i"
        class="h-36 w-full sm:w-72 border border-gh-border bg-gh-surface animate-pulse"
      />
    </div>

    <!-- error -->
    <p v-else-if="error" class="text-gh-muted text-sm text-center">
      couldn't reach github. &nbsp;
      <a
        :href="`https://github.com/${config.public.githubUsername}`"
        target="_blank"
        rel="noopener"
        class="underline underline-offset-4 hover:text-gh-accent transition-colors"
        >view profile instead <Icon name="lucide:arrow-right" class="inline size-3 align-middle" /></a
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
        class="group flex flex-col border border-gh-border bg-gh-surface hover:border-gh-accent/50 transition-all duration-200 w-full sm:w-72"
      >
        <!-- titlebar -->
        <div class="flex items-center gap-1.5 px-3 py-2 border-b border-gh-border">
          <Icon name="lucide:folder-git-2" class="size-3 text-gh-accent opacity-50 shrink-0" />
          <span class="text-xs font-medium text-gh-text truncate group-hover:text-white transition-colors">{{
            repo.name
          }}</span>
        </div>
        <!-- body -->
        <div class="flex flex-col flex-1 justify-between p-4">
          <p class="text-xs text-gh-muted leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {{ repo.description || '// no description' }}
          </p>
          <div class="mt-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span
                v-if="repo.language"
                class="inline-block w-2 h-2 rounded-full shrink-0"
                :style="{ backgroundColor: langColors[repo.language] ?? '#58a6ff' }"
              />
              <span class="text-xs text-gh-muted">{{ repo.language ?? '' }}</span>
            </div>
            <span v-if="repo.stargazers_count > 0" class="flex items-center gap-1 text-xs text-gh-muted">
              <Icon name="lucide:star" class="size-3 shrink-0" /> {{ repo.stargazers_count }}
            </span>
          </div>
        </div>
      </a>
    </TransitionGroup>
  </div>
</template>
