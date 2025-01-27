<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { ref } from 'vue'

const periods = [
  { label: '7 derniers jours', value: '7' },
  { label: '30 derniers jours', value: '30' },
  { label: '90 derniers jours', value: '90' },
]

const selectedPeriod = ref('7')
</script>

<template>
  <Head>
    <title>Tableau de bord</title>
  </Head>

  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold tracking-wide text-slate-800">Tableau de bord</h1>

    <Select v-model="selectedPeriod">
      <SelectTrigger class="w-[180px] bg-white">
        <SelectValue placeholder="Selectionnez une période" />
      </SelectTrigger>
      <SelectContent>
        <SelectLabel>Période</SelectLabel>
        <SelectItem v-for="period in periods" :value="period.value">
          {{ period.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>

  <div class="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4">
    <Stats />
    <TodayActivity />
    <DurationChart />
    <SalesChart />
  </div>
</template>
