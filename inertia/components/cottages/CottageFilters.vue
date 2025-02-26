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
  <div class="flex flex-col gap-3 sm:flex-row sm:self-end md:self-auto">
    <ToggleGroup
      :model-value="filter"
      type="single"
      data-allow-mismatch="attribute"
      @update:model-value="toggleFilter"
    >
      <ToggleGroupItem
        v-for="filter in filters"
        :value="filter.value"
        :aria-label="`Afficher ${filter.label.toLowerCase() === 'tout' ? 'tous les cottages' : 'les cottages ' + filter.label.toLowerCase()}`"
      >
        {{ filter.label }}
      </ToggleGroupItem>
    </ToggleGroup>

    <div class="flex items-center gap-3">
      <Select id="sortBy" v-model="sortBy">
        <SelectTrigger class="w-[160px] flex-1 bg-background" aria-label="Trier les cottages">
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
        @click="$emit('toggle-sort-order')"
      >
        <ArrowDownNarrowWideIcon v-if="sortOrder === 'asc'" />
        <ArrowDownWideNarrowIcon v-else />
      </Button>
    </div>
  </div>
</template>
