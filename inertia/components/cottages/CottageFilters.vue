<script setup lang="ts">
import { ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon } from 'lucide-vue-next'

type Props = {
  filters: { value: string; label: string }[]
  sortOptions: { value: string; label: string }[]
}

const filter = defineModel<string>('filter')
const sortBy = defineModel<string>('sortBy')
const sortOrder = defineModel<string>('sortOrder')

defineProps<Props>()

defineEmits(['toggle-sort-order'])

function toggleFilter(value: string | string[]) {
  if (typeof value === 'string') {
    filter.value = value
  }
}
</script>

<template>
  <div class="flex items-center gap-3">
    <ClientOnly>
      <ToggleGroup :model-value="filter" type="single" @update:model-value="toggleFilter">
        <ToggleGroupItem
          v-for="filter in filters"
          class="text-xs uppercase text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground data-[state=on]:bg-primary data-[state=on]:text-background"
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

    <Button variant="outline" @click="$emit('toggle-sort-order')">
      <ArrowDownNarrowWideIcon v-if="sortOrder === 'asc'" />
      <ArrowDownWideNarrowIcon v-else />
    </Button>
  </div>
</template>
