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
  <Head title="Tableau de bord" />

  <div class="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
    <h1 class="text-center text-3xl font-bold tracking-wide text-slate-800 sm:text-left">
      Tableau de bord
    </h1>

    <Select v-model="selectedPeriod">
      <SelectTrigger class="w-[180px] self-end bg-white">
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

  <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
    <Stats />
    <TodayActivity />
    <DurationChart />
    <SalesChart />
  </div>
</template>
