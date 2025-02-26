<script setup lang="ts">
const data = [
  {
    name: 'Moins de 5 nuits',
    pourcentage: Math.random() * 101,
  },
  {
    name: 'Entre 5 et 10 nuits',
    pourcentage: Math.random() * 101,
  },
  {
    name: 'Entre 10 et 15 nuits',
    pourcentage: Math.random() * 101,
  },
  {
    name: 'Entre 15 et 20 nuits',
    pourcentage: Math.random() * 101,
  },
  {
    name: 'Plus de 21 nuits',
    pourcentage: Math.random() * 101,
  },
]
</script>

<template>
  <div
    class="flex flex-col gap-4 overflow-x-auto rounded-md border bg-background p-4 sm:col-span-2 md:col-span-1 xl:col-span-2"
  >
    <span class="mb-5 border-b pb-5 text-xl font-medium">Durée des séjours</span>

    <DonutChart
      class="min-w-full"
      index="name"
      :category="'pourcentage'"
      :data="data"
      :sort-function="(a, b) => b.pourcentage - a.pourcentage"
      type="pie"
      :value-formatter="(value) => `${value.toFixed(2)} %`"
    />
    <!-- <span class="text-center text-sm text-slate-400"> Aucune donnée pour cette période </span> -->
  </div>
</template>
