<script setup lang="ts">
import { cabinFilterValidator } from '#validators/cabin'
import { router, usePage } from '@inertiajs/vue3'
import type { Infer } from '@vinejs/vine/types'
import { ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon } from 'lucide-vue-next'
import { ref, watch } from 'vue'

const props = defineProps<{
  filters: Infer<typeof cabinFilterValidator>
}>()

const filters = [
  { value: 'all', label: 'Tous les chalets' },
  { value: 'no-discount', label: 'Les chalets sans remise' },
  { value: 'with-discount', label: 'Les chalets avec remise' },
] as const

const filter = ref<string>(props.filters.discountFilter || 'all')

const sortBy = ref<string>(props.filters.sortBy || 'name')

const sortOptions = [
  { value: 'name', label: 'Nom' },
  { value: 'price', label: 'Prix' },
  { value: 'capacity', label: 'Capacité' },
] as const

const sortOrder = ref(props.filters.sortOrder || 'asc')

function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const page = usePage()

watch(filter, (value) => {
  router.get(
    page.url,
    { discountFilter: value },
    { preserveState: true, preserveScroll: true, only: ['cabins'] }
  )
})

watch(sortBy, (value) => {
  router.get(
    page.url,
    { sortBy: value },
    { preserveState: true, preserveScroll: true, only: ['cabins'] }
  )
})

watch(sortOrder, (value) => {
  router.get(
    page.url,
    { sortOrder: value },
    { preserveState: true, preserveScroll: true, only: ['cabins'] }
  )
})
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:self-end md:self-auto">
    <Select v-model="filter">
      <SelectTrigger class="flex-1 bg-background" aria-label="Filtrer les chalets">
        <SelectValue class="pr-2" placeholder="Afficher" />
      </SelectTrigger>
      <SelectContent>
        <SelectLabel>Afficher</SelectLabel>
        <SelectItem v-for="filter in filters" :value="filter.value">
          {{ filter.label }}
        </SelectItem>
      </SelectContent>
    </Select>

    <div class="flex items-center gap-3">
      <Select id="sortBy" v-model="sortBy">
        <SelectTrigger class="w-[160px] flex-1 bg-background" aria-label="Trier les chalets">
          <SelectValue placeholder="Trier par" />
        </SelectTrigger>
        <SelectContent>
          <SelectLabel>Trier par</SelectLabel>
          <SelectItem v-for="option in sortOptions" :value="option.value">
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        aria-label="Trier par ordre croissant/décroissant"
        @click="toggleSortOrder"
      >
        <ArrowDownNarrowWideIcon v-if="sortOrder === 'asc'" />
        <ArrowDownWideNarrowIcon v-else />
      </Button>
    </div>
  </div>
</template>
