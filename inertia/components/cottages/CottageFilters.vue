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
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:self-end md:self-auto">
    <Select v-model="filter">
      <SelectTrigger class="flex-1 bg-background">
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
