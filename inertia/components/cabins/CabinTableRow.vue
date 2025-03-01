<script setup lang="ts">
import type CabinDto from '#dtos/cabin'
import { Link } from '@inertiajs/vue3'
import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from 'lucide-vue-next'
import { computed } from 'vue'
import { formatCurrency } from '~/utils'

const props = defineProps<{
  cabin: CabinDto
}>()

const emit = defineEmits(['delete', 'edit'])

const discount = computed(() => props.cabin.discount * props.cabin.price)

function openDeletionDialog(id: number) {
  emit('delete', id)
}

function openEditingDialog(cabin: CabinDto) {
  emit('edit', cabin)
}
</script>

<template>
  <TableRow>
    <TableCell class="whitespace-nowrap px-4 font-medium">
      <Link :href="`/cabins/${cabin.id}`">{{ cabin.name }}</Link>
    </TableCell>
    <TableCell class="whitespace-nowrap px-4">{{ cabin.capacity }} personnes</TableCell>
    <TableCell class="whitespace-nowrap px-4 font-sono font-medium">
      {{ formatCurrency(cabin.price) }}
    </TableCell>
    <TableCell class="whitespace-nowrap px-4">
      <span v-if="discount" class="font-sono text-primary">{{ formatCurrency(discount) }}</span>
    </TableCell>
    <TableCell class="px-4 text-right">
      <DropdownMenu>
        <DropdownMenuTrigger class="px-4" aria-label="Afficher les actions pour ce chalet">
          <EllipsisVerticalIcon class="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem aria-label="Modifier ce chalet" @click="openEditingDialog(cabin)">
            <PencilIcon class="size-4" />
            <span>Modifier</span>
          </DropdownMenuItem>
          <DropdownMenuItem aria-label="Supprimer ce chalet" @click="openDeletionDialog(cabin.id)">
            <Trash2Icon class="size-4" />
            <span>Supprimer</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
</template>
