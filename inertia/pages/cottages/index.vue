<script setup lang="ts">
import type CottagesController from '#controllers/cottages_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head, Link, router, usePage } from '@inertiajs/vue3'
import { ChevronLeftIcon, ChevronRightIcon, PlusCircleIcon } from 'lucide-vue-next'
import { ref, watch } from 'vue'

type Props = {
  cottages: InferPageProps<CottagesController, 'index'>['cottages']
  filters: InferPageProps<CottagesController, 'index'>['filters']
}

const props = defineProps<Props>()

const filter = ref(props.filters.discount || 'all')

const filters = [
  { value: 'all', label: 'Tous' },
  { value: 'no-discount', label: 'Sans remise' },
  { value: 'with-discount', label: 'Avec remise' },
]

const sortBy = ref(props.filters.sortBy || 'name')

const sortOptions = [
  { value: 'name', label: 'Nom' },
  { value: 'price', label: 'Prix' },
  { value: 'capacity', label: 'Capacité' },
]

const sortOrder = ref(props.filters.sortOrder || 'asc')

function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const page = usePage()

watch(filter, (value) => {
  router.get(page.url, { discount: value }, { preserveState: true, preserveScroll: true })
})

watch(sortBy, (value) => {
  router.get(page.url, { sortBy: value }, { preserveState: true, preserveScroll: true })
})

watch(sortOrder, (value) => {
  router.get(page.url, { sortOrder: value }, { preserveState: true, preserveScroll: true })
})

const isAddCottageModalOpen = ref(false)
</script>

<template>
  <Head title="Cottages" />

  <div class="mb-10 flex flex-col justify-between gap-5 md:flex-row">
    <h1 class="text-center text-3xl font-bold tracking-wide sm:text-left">Cottages</h1>

    <CottageFilters
      v-model:filter="filter"
      v-model:sort-by="sortBy"
      v-model:sort-order="sortOrder"
      :sort-options
      :filters
      @toggle-sort-order="toggleSortOrder"
    />
  </div>

  <CottageTable :cottages="cottages.data" />

  <div class="flex flex-col-reverse justify-between gap-5 sm:flex-row lg:items-center">
    <Button class="flex items-center gap-3" @click="isAddCottageModalOpen = true">
      <PlusCircleIcon class="size-5" />
      <span>Ajouter un cottage</span>
    </Button>

    <div class="flex items-center gap-3">
      <Button variant="outline" as-child>
        <Link
          class="flex-1"
          :class="{ 'pointer-events-none opacity-50': !cottages.pagination.previousPageUrl }"
          :href="cottages.pagination.previousPageUrl || ''"
          :aria-disabled="!cottages.pagination.previousPageUrl"
          preserve-state
        >
          <ChevronLeftIcon class="size-5" />
          <span>Précédent</span>
        </Link>
      </Button>
      <Button variant="outline" as-child>
        <Link
          class="flex-1"
          :class="{ 'pointer-events-none opacity-50': !cottages.pagination.nextPageUrl }"
          :href="cottages.pagination.nextPageUrl || ''"
          :aria-disabled="!cottages.pagination.nextPageUrl"
          preserve-state
        >
          <span>Suivant</span>
          <ChevronRightIcon class="size-5" />
        </Link>
      </Button>
    </div>
  </div>

  <AddCottageModal v-model:open="isAddCottageModalOpen" />
</template>
