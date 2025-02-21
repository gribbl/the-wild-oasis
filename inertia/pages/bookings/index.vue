<script setup lang="ts">
import BookingsController from '#controllers/bookings_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head, Link, usePage, router } from '@inertiajs/vue3'
import {
  ArrowDownNarrowWideIcon,
  ArrowDownWideNarrowIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-vue-next'
import { ref, watch } from 'vue'

type Props = {
  bookings: InferPageProps<BookingsController, 'index'>['bookings']
  filters: InferPageProps<BookingsController, 'index'>['filters']
}

const props = defineProps<Props>()

const filter = ref(props.filters.status || 'all')

const filters = [
  { value: 'all', label: 'Tout' },
  { value: 'checked-in', label: 'Enregistré' },
  { value: 'checked-out', label: 'Départ effectué' },
  { value: 'unconfirmed', label: 'Non confirmé' },
] as const

const sortBy = ref(props.filters.sortBy || 'date')

const sortOptions = [
  { value: 'date', label: 'Date' },
  { value: 'cottage', label: 'Cottage' },
  { value: 'guest', label: 'Guest' },
]

const sortOrder = ref(props.filters.sortOrder || 'asc')

function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const page = usePage()

watch(filter, (value) => {
  router.get(page.url, { status: value }, { preserveState: true, preserveScroll: true })
})

watch(sortBy, (value) => {
  router.get(page.url, { sortBy: value }, { preserveState: true, preserveScroll: true })
})

watch(sortOrder, (value) => {
  router.get(page.url, { sortOrder: value }, { preserveState: true, preserveScroll: true })
})

function toggleFilter(value: string | string[]) {
  if (typeof value === 'string') {
    filter.value = value as (typeof filters)[number]['value']
  }
}
</script>

<template>
  <Head title="Réservations" />

  <div class="mb-10 flex flex-col justify-between gap-5 lg:flex-row">
    <h1 class="text-center text-3xl font-bold tracking-wide text-slate-800 sm:text-left">
      Réservations
    </h1>

    <div class="flex flex-col gap-3 sm:flex-row sm:self-end lg:self-auto">
      <ToggleGroup
        :model-value="filter"
        type="single"
        data-allow-mismatch="attribute"
        @update:model-value="toggleFilter"
      >
        <ToggleGroupItem
          v-for="filter in filters"
          class="flex-1 text-xs uppercase hover:text-foreground data-[state=off]:bg-muted-foreground/10 data-[state=on]:bg-primary data-[state=off]:text-muted-foreground data-[state=on]:text-background data-[state=off]:hover:bg-muted-foreground/15 sm:flex-auto"
          :value="filter.value"
          aria-label="Toggle bold"
        >
          {{ filter.label }}
        </ToggleGroupItem>
      </ToggleGroup>

      <div class="flex items-center gap-3">
        <Select v-model="sortBy">
          <SelectTrigger class="w-[160px] flex-1 bg-white">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectLabel>Trier par</SelectLabel>
            <SelectItem v-for="option in sortOptions" :value="option.value">
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" @click="toggleSortOrder">
          <ArrowDownNarrowWideIcon v-if="sortOrder === 'asc'" />
          <ArrowDownWideNarrowIcon v-else />
        </Button>
      </div>
    </div>
  </div>

  <BookingTable :bookings="bookings.data" />

  <div v-if="bookings.data.length" class="flex items-center gap-3 sm:justify-end">
    <Button variant="outline" as-child>
      <Link
        class="flex-1 sm:flex-none"
        :class="{ 'pointer-events-none opacity-50': !bookings.pagination.previousPageUrl }"
        :href="bookings.pagination.previousPageUrl || ''"
        :aria-disabled="!bookings.pagination.previousPageUrl"
        preserve-state
      >
        <ChevronLeftIcon class="size-5" />
        <span>Précédent</span>
      </Link>
    </Button>
    <Button variant="outline" as-child>
      <Link
        class="flex-1 sm:flex-none"
        :class="{ 'pointer-events-none opacity-50': !bookings.pagination.nextPageUrl }"
        :href="bookings.pagination.nextPageUrl || ''"
        :aria-disabled="!bookings.pagination.nextPageUrl"
        preserve-state
      >
        <span>Suivant</span>
        <ChevronRightIcon class="size-5" />
      </Link>
    </Button>
  </div>
</template>
