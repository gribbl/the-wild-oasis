<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import {
  ArrowDownNarrowWideIcon,
  ArrowDownWideNarrowIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { Pagination, PaginationList, PaginationListItem } from '~/components/ui/pagination'

const props = defineProps<{ cottages: any[] }>()

const filteredCottages = computed(() => {
  const cottages = [...props.cottages]

  if (filter.value === 'no-discount') {
    return cottages.filter((cottage) => !cottage.discount)
  }

  if (filter.value === 'with-discount') {
    return cottages.filter((cottage) => cottage.discount)
  }

  return cottages
})

const filter = ref('all')

const filters = [
  { value: 'all', label: 'Tout' },
  { value: 'no-discount', label: 'Sans remise' },
  { value: 'with-discount', label: 'Avec remise' },
]

function toggleFilter(value: string | string[]) {
  if (typeof value === 'string') filter.value = value
}

const sortBy = ref('name')

const sortOptions = [
  { value: 'name', label: 'Nom' },
  { value: 'price', label: 'Prix' },
  { value: 'capacity', label: 'Capacité' },
]

const sortOrder = ref('asc')

function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>

<template>
  <Head>
    <title>Cottages</title>
  </Head>

  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold tracking-wide text-slate-800">Cottages</h1>

    <div class="flex items-center gap-3">
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
        <TableRow class="uppercase">
          <TableHead>Cottage</TableHead>
          <TableHead>Capacité</TableHead>
          <TableHead>Prix</TableHead>
          <TableHead>Remise</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="cottage in filteredCottages" :key="cottage.id">
          <TableCell class="font-medium">
            <Link :href="`/cottages/${cottage.id}`">{{ cottage.name }}</Link>
          </TableCell>
          <TableCell>{{ cottage.maxCapacity }} personnes</TableCell>
          <TableCell class="font-medium">{{ cottage.regularPrice.toFixed(2) }} €</TableCell>
          <TableCell>
            <span v-if="cottage.discount" class="text-primary">
              {{ cottage.discount.toFixed(2) }} €
            </span>
            <span v-else class="text-foreground">&ndash;</span>
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger><EllipsisVerticalIcon class="size-5" /></DropdownMenuTrigger>
              <DropdownMenuContent>
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
    <Pagination v-slot="{ page }" :total="100" :sibling-count="1" show-edges :default-page="2">
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst />
        <PaginationPrev />

        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button class="h-10 w-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext />
        <PaginationLast />
      </PaginationList>
    </Pagination>
  </div>
</template>
