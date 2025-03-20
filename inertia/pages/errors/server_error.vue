<script setup lang="ts">
import { Head } from '@inertiajs/vue3'

defineProps<{ error: any }>()
</script>

<template>
  <Head>
    <title>Erreur serveur</title>
    <meta name="description" content="Nous rencontrons actuellement un problème avec le serveur." />
  </Head>

  <div class="mb-10 flex flex-col items-center justify-between gap-5">
    <h1 class="text-3xl font-bold tracking-wide">Oups, quelque chose s'est mal passé</h1>
    <span class="text-muted-foreground">
      Nous rencontrons actuellement un problème avec le serveur.
    </span>
  </div>
</template>
