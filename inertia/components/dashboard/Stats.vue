<script setup lang="ts">
import {
  BriefcaseBusinessIcon,
  CalendarDaysIcon,
  ChartNoAxesColumnIncreasingIcon,
  EuroIcon,
} from 'lucide-vue-next'
</script>

<template>
  <div class="flex items-center gap-4 rounded-md border bg-background p-4">
    <div class="rounded-full bg-sky-500/15 p-4">
      <BriefcaseBusinessIcon class="size-6 text-sky-500" />
    </div>
    <div class="flex min-w-0 flex-col">
      <span class="overflow-hidden text-ellipsis text-xs font-medium uppercase">
        Réservations
      </span>
      <span class="text-2xl font-semibold text-muted-foreground">0</span>
    </div>
  </div>

  <div class="flex items-center gap-4 rounded-md border bg-background p-4">
    <div class="rounded-full bg-emerald-500/15 p-4">
      <EuroIcon class="size-6 text-emerald-500" />
    </div>
    <div class="flex min-w-0 flex-col">
      <span class="overflow-hidden text-ellipsis text-xs font-medium uppercase"> Revenus </span>
      <span class="text-2xl font-semibold text-muted-foreground">0.00€</span>
    </div>
  </div>

  <div class="flex items-center gap-4 rounded-md border bg-background p-4">
    <div class="rounded-full bg-indigo-500/15 p-4">
      <CalendarDaysIcon class="size-6 text-indigo-500" />
    </div>
    <div class="flex min-w-0 flex-col">
      <span class="overflow-hidden text-ellipsis text-xs font-medium uppercase">
        Enregistrements
      </span>
      <span class="text-2xl font-semibold text-muted-foreground">0</span>
    </div>
  </div>

  <div class="flex items-center gap-4 rounded-md border bg-background p-4">
    <div class="rounded-full bg-amber-500/15 p-4">
      <ChartNoAxesColumnIncreasingIcon class="size-6 text-amber-500" />
    </div>
    <div class="flex min-w-0 flex-col">
      <span class="overflow-hidden text-ellipsis text-xs font-medium uppercase">
        Taux d'occupation
      </span>
      <span class="text-2xl font-semibold text-muted-foreground">0%</span>
    </div>
  </div>
</template>
