<script setup lang="ts">
const data = [
  { name: '01 Jan', total: 1200, extras: 200 },
  { name: '02 Jan', total: 1400, extras: 250 },
  { name: '03 Jan', total: 1000, extras: 150 },
  { name: '04 Jan', total: 900, extras: 100 },
  { name: '05 Jan', total: 1100, extras: 180 },
  { name: '06 Jan', total: 1500, extras: 300 },
  { name: '07 Jan', total: 1700, extras: 400 },
  { name: '08 Jan', total: 1300, extras: 220 },
  { name: '09 Jan', total: 1250, extras: 180 },
  { name: '10 Jan', total: 1400, extras: 250 },
]
</script>

<template>
  <div
    class="flex min-w-full flex-col gap-4 rounded-md border border-slate-200 bg-background p-4 sm:col-span-2 xl:col-span-4"
  >
    <div class="mb-5 flex items-center justify-between border-b border-slate-100 pb-5">
      <span class="text-xl font-medium text-slate-600">Revenus</span>
      <!-- <span class="text-xs font-medium uppercase text-slate-500">
          01 Janvier 2025 &ndash; 26 Janvier 2025
        </span> -->
    </div>

    <div class="min-w-full overflow-x-auto">
      <AreaChart
        class="min-w-[600px]"
        :data="data"
        index="name"
        :categories="['total', 'extras']"
        :y-formatter="(value) => `${value} €`"
      />
    </div>
    <!-- <span class="text-center text-sm text-slate-400"> Aucune donnée pour cette période </span> -->
  </div>
</template>
