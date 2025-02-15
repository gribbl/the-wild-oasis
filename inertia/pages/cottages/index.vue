<script setup lang="ts">
import { DtoPaginator } from '#dtos/base'
import CottageDto from '#dtos/cottage'
import { Head, Link, router, usePage } from '@inertiajs/vue3'
import { ref, watch } from 'vue'
import CottageFilters from '~/components/CottageFilters.vue'

type Props = {
  cottages: DtoPaginator<CottageDto>
  filters: Record<string, any>
}

const props = defineProps<Props>()

const filter = ref(props.filters.discount || 'all')

const filters = [
  { value: 'all', label: 'Tout' },
  { value: 'no-discount', label: 'Sans remise' },
  { value: 'with-discount', label: 'Avec remise' },
]

const sortBy = ref(props.filters.sortBy || 'name')

const sortOptions = [
  { value: 'name', label: 'Nom' },
  { value: 'price', label: 'Prix' },
  { value: 'capacity', label: 'Capacité' },
]

const sortOrder = ref(props.filters.orderBy || 'asc')

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

const addCottageModalVisible = ref(false)
</script>

<template>
  <Head title="Cottages" />

  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold tracking-wide text-slate-800">Cottages</h1>
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

  <div class="flex items-center justify-between">
    <Button @click="addCottageModalVisible = true">Ajouter un cottage</Button>
    <div class="flex items-center gap-3">
      <Button variant="outline" as-child>
        <Link
          :class="{ 'pointer-events-none opacity-50': !cottages.pagination.previousPageUrl }"
          :href="cottages.pagination.previousPageUrl || ''"
          :aria-disabled="!cottages.pagination.previousPageUrl"
          preserve-state
        >
          Précédent
        </Link>
      </Button>
      <Button variant="outline" as-child>
        <Link
          :class="{ 'pointer-events-none opacity-50': !cottages.pagination.nextPageUrl }"
          :href="cottages.pagination.nextPageUrl || ''"
          :aria-disabled="!cottages.pagination.nextPageUrl"
          preserve-state
        >
          Suivant
        </Link>
      </Button>
    </div>
  </div>

  <AddCottageModal v-model:visible="addCottageModalVisible" />
</template>
