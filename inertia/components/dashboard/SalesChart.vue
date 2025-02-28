<script setup lang="ts">
type Props = {
  data: Record<string, any>[]
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex min-w-full flex-col gap-4 rounded-md border bg-background p-4 sm:col-span-2 xl:col-span-4"
  >
    <div class="mb-5 flex items-center justify-between border-b pb-5">
      <span class="text-xl font-medium">Revenus</span>
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
