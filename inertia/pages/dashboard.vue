<script setup lang="ts">
import { dashboardFilterValidator } from '#validators/dashboard'
import { Head, router, usePage } from '@inertiajs/vue3'
import type { Infer } from '@vinejs/vine/types'
import { ref, watch } from 'vue'

type Props = {
  bookingsCount: number
  checkinsCount: number
  revenue: number
  occupancyRate: number
  chartData: Record<string, any>[]
  filters: Infer<typeof dashboardFilterValidator>
}

const props = defineProps<Props>()

const periods = [
  { label: '7 derniers jours', value: 'last-7-days' },
  { label: '30 derniers jours', value: 'last-30-days' },
  { label: '90 derniers jours', value: 'last-90-days' },
  { label: '180 derniers jours', value: 'last-180-days' },
]

const selectedPeriod = ref(props.filters.period || 'last-180-days')

const page = usePage()

watch(selectedPeriod, (value) => {
  router.get(page.url, { period: value }, { preserveState: true, preserveScroll: true })
})
</script>

<template>
  <Head title="Tableau de bord" />

  <div class="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
    <h1 class="text-center text-3xl font-bold tracking-wide sm:text-left">Tableau de bord</h1>

    <Select v-model="selectedPeriod">
      <SelectTrigger class="w-[180px] self-end bg-background">
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
    <Stats :bookings-count :checkins-count :revenue :occupancy-rate />
    <!-- <TodayActivity />
    <DurationChart /> -->
    <SalesChart :data="chartData" />
  </div>
</template>
