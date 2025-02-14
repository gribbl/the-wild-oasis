<script setup lang="ts">
import CottagesController from '#controllers/cottages_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, Link, router, usePage } from '@inertiajs/vue3'
import {
  ArrowDownNarrowWideIcon,
  ArrowDownWideNarrowIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'
import ClientOnly from '~/components/ClientOnly.vue'

type Props = {
  cottages: InferPageProps<CottagesController, 'index'>['cottages']
  filters: InferPageProps<CottagesController, 'index'>['filters']
}

const props = defineProps<Props>()

const filter = ref(props.filters.discount || 'all')

onMounted(() => console.log(filter.value))

const filters = [
  { value: 'all', label: 'Tout' },
  { value: 'no-discount', label: 'Sans remise' },
  { value: 'with-discount', label: 'Avec remise' },
]

const page = usePage()

function toggleFilter(value: string | string[]) {
  if (value) {
    filter.value = value
  }
}

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

onMounted(() => console.log('mounted'))

watch([filter, sortBy, sortOrder], ([discount, sortBy, sortOrder]) => {
  router.get(
    page.url,
    { discount, sortBy, sortOrder },
    { preserveState: true, preserveScroll: true }
  )
})
</script>

<template>
  <Head>
    <title>Cottages</title>
  </Head>

  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold tracking-wide text-slate-800">Cottages</h1>

    <div class="flex items-center gap-3">
      <ClientOnly>
        <ToggleGroup :model-value="filter" type="single" @update:model-value="toggleFilter">
          <ToggleGroupItem
            v-for="filter in filters"
            class="text-xs uppercase text-slate-600 hover:bg-slate-200 hover:text-slate-800 data-[state=on]:bg-primary data-[state=on]:text-background"
            :value="filter.value"
            aria-label="Toggle bold"
          >
            {{ filter.label }}
          </ToggleGroupItem>
        </ToggleGroup>
      </ClientOnly>

      <Select v-model="sortBy">
        <SelectTrigger class="w-[180px] bg-white">
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

  <div class="rounded-md border border-slate-200 bg-white p-4">
    <Table layout="fixed">
      <TableHeader>
        <TableRow class="font-bold uppercase">
          <TableHead>Cottage</TableHead>
          <TableHead>Capacité</TableHead>
          <TableHead>Prix</TableHead>
          <TableHead>Remise</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="cottage in cottages.data" :key="cottage.id">
          <TableCell class="font-medium">
            <Link :href="`/cottages/${cottage.id}`">{{ cottage.name }}</Link>
          </TableCell>
          <TableCell>{{ cottage.capacity }} personnes</TableCell>
          <TableCell class="font-sono font-medium"> {{ cottage.price.toFixed(2) }} € </TableCell>
          <TableCell>
            <span v-if="cottage.discount" class="font-sono text-primary">
              {{ cottage.discount.toFixed(2) }} €
            </span>
            <span v-else class="text-foreground">&ndash;</span>
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger><EllipsisVerticalIcon class="size-5" /></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <PencilIcon class="size-4" />
                  <span>Modifier</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2Icon class="size-4" />
                  <span>Supprimer</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>

  <div class="flex items-center justify-between">
    <Button>Ajouter un cottage</Button>
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
</template>
