import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  fonts: {
    families: [{ name: 'JetBrains Mono', provider: 'google' }],
  },
  runtimeConfig: {
    public: {
      githubUsername: 'Luminaire1337',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
