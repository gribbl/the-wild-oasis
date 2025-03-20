<script setup lang="ts">
import type { bookingFilterValidator } from '#validators/booking'
import { router, usePage } from '@inertiajs/vue3'
import { Infer } from '@vinejs/vine/types'
import { ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon } from 'lucide-vue-next'
import { ref, watch } from 'vue'

const props = defineProps<{
  filters: Infer<typeof bookingFilterValidator>
}>()

const filters = [
  { value: 'all', label: 'Toutes les réservations' },
  { value: 'unconfirmed', label: 'Les réservations non confirmées' },
  { value: 'checked-in', label: 'Les réservations enregistrées' },
  { value: 'checked-out', label: 'Les réservations terminées' },
] as const

const filter = ref<string>(props.filters.status || 'all')

const sortOptions = [
  { value: 'date', label: 'Date' },
  { value: 'cabin', label: 'Chalet' },
  { value: 'guest', label: 'Client' },
] as const

const sortBy = ref<string>(props.filters.sortBy || 'date')

const sortOrder = ref(props.filters.sortOrder || 'asc')

function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const page = usePage()

watch(filter, (value) => {
  router.get(
    page.url,
    { status: value },
    { preserveState: true, preserveScroll: true, only: ['bookings'] }
  )
})

watch(sortBy, (value) => {
  router.get(
    page.url,
    { sortBy: value },
    { preserveState: true, preserveScroll: true, only: ['bookings'] }
  )
})

watch(sortOrder, (value) => {
  router.get(
    page.url,
    { sortOrder: value },
    { preserveState: true, preserveScroll: true, only: ['bookings'] }
  )
})
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:self-end lg:self-auto">
    <Select v-model="filter">
      <SelectTrigger class="flex-1 bg-background" aria-label="Filter les réservations">
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
      <Select v-model="sortBy">
        <SelectTrigger class="w-[160px] flex-1 bg-background" aria-label="Trier les réservations">
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
