<script setup lang="ts">
import {
  BriefcaseBusinessIcon,
  CalendarDaysIcon,
  ChartNoAxesColumnIncreasingIcon,
  EuroIcon,
} from 'lucide-vue-next'
import { formatCurrency } from '~/utils'

defineProps<{
  bookingsCount: number
  checkinsCount: number
  revenue: number
  occupancyRate: number
}>()
</script>

<template>
  <div class="flex items-center gap-4 rounded-md border bg-background p-4">
    <div class="rounded-full bg-sky-500/15 p-4">
      <BriefcaseBusinessIcon class="size-6 text-sky-500" />
    </div>
    <div class="flex min-w-0 flex-col">
      <span
        class="overflow-hidden text-ellipsis text-xs font-medium uppercase text-muted-foreground"
      >
        Réservations
      </span>
      <span class="text-2xl font-semibold">{{ bookingsCount }}</span>
    </div>
  </div>

  <div class="flex items-center gap-4 rounded-md border bg-background p-4">
    <div class="rounded-full bg-indigo-500/15 p-4">
      <CalendarDaysIcon class="size-6 text-indigo-500" />
    </div>
    <div class="flex min-w-0 flex-col">
      <span
        class="overflow-hidden text-ellipsis text-xs font-medium uppercase text-muted-foreground"
      >
        Enregistrements
      </span>
      <span class="text-2xl font-semibold">{{ checkinsCount }}</span>
    </div>
  </div>

  <div class="flex items-center gap-4 rounded-md border bg-background p-4">
    <div class="rounded-full bg-emerald-500/15 p-4">
      <EuroIcon class="size-6 text-emerald-500" />
    </div>
    <div class="flex min-w-0 flex-col">
      <span
        class="overflow-hidden text-ellipsis text-xs font-medium uppercase text-muted-foreground"
      >
        Revenus
      </span>
      <span class="text-2xl font-semibold"> {{ formatCurrency(revenue) }}</span>
    </div>
  </div>

  <div class="flex items-center gap-4 rounded-md border bg-background p-4">
    <div class="rounded-full bg-amber-500/15 p-4">
      <ChartNoAxesColumnIncreasingIcon class="size-6 text-amber-500" />
    </div>
    <div class="flex min-w-0 flex-col">
      <span
        class="overflow-hidden text-ellipsis text-xs font-medium uppercase text-muted-foreground"
      >
        Taux d'occupation
      </span>
      <span class="text-2xl font-semibold"> {{ occupancyRate.toFixed(2) }}% </span>
    </div>
  </div>
</template>
