<script setup lang="ts">
import type CottageDto from '#dtos/cottage'
import { Link } from '@inertiajs/vue3'
import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from 'lucide-vue-next'
import { computed } from 'vue'
import { formatCurrency } from '~/utils'

type Props = {
  cottage: CottageDto
}

const props = defineProps<Props>()

const emit = defineEmits(['delete', 'edit'])

const discount = computed(() => props.cottage.discount * props.cottage.price)

function openDeletionDialog(id: number) {
  emit('delete', id)
}

function openEditingDialog(cottage: CottageDto) {
  emit('edit', cottage)
}
</script>

<template>
  <TableRow>
    <TableCell class="whitespace-nowrap px-4 font-medium">
      <Link :href="`/cottages/${cottage.id}`">{{ cottage.name }}</Link>
    </TableCell>
    <TableCell class="whitespace-nowrap px-4">{{ cottage.capacity }} personnes</TableCell>
    <TableCell class="whitespace-nowrap px-4 font-sono font-medium">
      {{ formatCurrency(cottage.price) }}
    </TableCell>
    <TableCell class="whitespace-nowrap px-4">
      <span v-if="discount" class="font-sono text-primary">{{ formatCurrency(discount) }}</span>
    </TableCell>
    <TableCell class="px-4 text-right">
      <DropdownMenu>
        <DropdownMenuTrigger class="px-4" aria-label="Afficher les actions pour ce cottage">
          <EllipsisVerticalIcon class="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem aria-label="Modifier ce cottage" @click="openEditingDialog(cottage)">
            <PencilIcon class="size-4" />
            <span>Modifier</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Supprimer ce cottage"
            @click="openDeletionDialog(cottage.id)"
          >
            <Trash2Icon class="size-4" />
            <span>Supprimer</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
</template>
