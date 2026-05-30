<script setup lang="ts">
useSeoMeta({
  title: 'Luminaire',
  titleTemplate: '%s · matchlesslumi.dev',
  description: 'Software engineer. Personal site of Michał Łuczyński.',
  ogTitle: 'Luminaire · matchlesslumi.dev',
  ogDescription: 'Software engineer. Personal site of Michał Łuczyński.',
  ogUrl: 'https://matchlesslumi.dev',
  ogType: 'website',
  ogLocale: 'en_US',
  twitterCard: 'summary',
  twitterTitle: 'Luminaire · matchlesslumi.dev',
  twitterDescription: 'Software engineer. Personal site of Michał Łuczyński.',
  robots: 'index, follow',
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'canonical', href: 'https://matchlesslumi.dev' }],
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
