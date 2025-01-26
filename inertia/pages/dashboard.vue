<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
</script>

<template>
  <Head>
    <title>Tableau de bord</title>
  </Head>

  <h1 class="text-3xl font-bold tracking-wide text-slate-800">Tableau de bord</h1>

  <div class="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4">
    <Stats />
    <TodayActivity />
    <DurationChart />
    <SalesChart />
  </div>
</template>
