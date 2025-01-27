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
    class="col-span-2 flex flex-col gap-4 rounded-md border border-slate-200 bg-background p-4 pb-10"
  >
    <span class="mb-5 border-b border-slate-100 pb-5 text-xl font-medium text-slate-600">
      Durée des séjours
    </span>
    <DonutChart
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
