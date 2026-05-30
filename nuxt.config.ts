import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/eslint'],
  eslint: {
    config: {
      typescript: { strict: true },
    },
  },
  css: ['~/assets/css/main.css'],
  fonts: {
    families: [{ name: 'JetBrains Mono', provider: 'google' }],
  },
  runtimeConfig: {
    public: {
      githubUsername: 'Luminaire1337',
      emailB64: 'aGlAbWF0Y2hsZXNzbHVtaS5kZXY=',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
