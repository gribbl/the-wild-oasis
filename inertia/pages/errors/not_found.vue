<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
</script>

<template>
  <Head>
    <title>Page introuvable</title>
    <meta name="description" content="Cette page n'existe pas." />
  </Head>

  <div class="mb-10 flex flex-col items-center justify-between gap-5">
    <h1 class="text-3xl font-bold tracking-wide">Page introuvable</h1>
    <span class="text-muted-foreground">
      Désolé, la page que vous recherchez n’existe pas ou a été déplacée.
    </span>
  </div>
</template>
