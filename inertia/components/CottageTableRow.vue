<script setup lang="ts">
import type CottageDto from '#dtos/cottage'
import { Link } from '@inertiajs/vue3'
import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from 'lucide-vue-next'

type Props = {
  cottage: CottageDto
}

defineProps<Props>()
</script>

<template>
  <TableRow>
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
        <DropdownMenuTrigger> <EllipsisVerticalIcon class="size-5" /></DropdownMenuTrigger>
        <DropdownMenuContent align="center">
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
</template>
