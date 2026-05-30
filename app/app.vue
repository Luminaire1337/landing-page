<script setup lang="ts">
useSeoMeta({
  title: 'Luminaire',
  titleTemplate: '%s · matchlesslumi.dev',
  description: 'Software engineer. Personal site of Michał Łuczyński.',
  ogTitle: 'Luminaire · matchlesslumi.dev',
  ogDescription: 'Software engineer. Personal site of Michał Łuczyński.',
  ogUrl: 'https://matchlesslumi.dev',
  ogImage: 'https://matchlesslumi.dev/og.webp',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website',
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://matchlesslumi.dev/og.webp',
  twitterTitle: 'Luminaire · matchlesslumi.dev',
  twitterDescription: 'Software engineer. Personal site of Michał Łuczyński.',
  robots: 'index, follow',
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'preconnect', href: 'https://api.github.com' },
    { rel: 'canonical', href: 'https://matchlesslumi.dev' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  ],
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
