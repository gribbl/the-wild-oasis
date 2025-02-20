<script setup lang="ts">
import dayjs from 'dayjs'
import { EllipsisVerticalIcon, EyeIcon, Trash2Icon } from 'lucide-vue-next'

const { booking } = defineProps<{ booking: any }>()

const relativeTime = dayjs(booking.startDate).from(dayjs())
const numberOfNights = dayjs(booking.endDate).diff(booking.startDate, 'day')
const dateRange = `${dayjs(booking.startDate).format('MMM DD YYYY')} - ${dayjs(booking.endDate).format('MMM DD YYYY')}`
const total = `${(booking.cottage.price - booking.cottage.price * booking.cottage.discount + booking.extrasPrice).toFixed(2)} €`
</script>

<template>
  <TableRow>
    <TableCell class="whitespace-nowrap pr-4 font-medium">
      {{ booking.cottage.name }}
    </TableCell>
    <TableCell>
      <div class="flex flex-col">
        <span class="font-medium">{{ booking.guest.fullname }}</span>
        <span class="text-muted-foreground">{{ booking.guest.email }}</span>
      </div>
    </TableCell>
    <TableCell class="whitespace-nowrap px-4">
      <div class="flex flex-col">
        <div class="flex items-center gap-1 font-medium">
          <span>{{ relativeTime }}</span>
          <span>&rarr;</span>
          <span>{{ numberOfNights }} nuit{{ numberOfNights > 1 ? 's' : '' }}</span>
        </div>
        <div class="text-muted-foreground">
          {{ dateRange }}
        </div>
      </div>
    </TableCell>
    <TableCell class="whitespace-nowrap px-4">
      <Badge v-if="booking.status === 'unconfirmed'" variant="secondary">Non confirmé</Badge>
      <Badge v-if="booking.status === 'checked-in'">Enregistré</Badge>
      <Badge v-if="booking.status === 'checked-out'" variant="destructive">Départ effectué</Badge>
    </TableCell>
    <TableCell class="whitespace-nowrap px-4 font-sono font-medium text-primary">
      {{ total }}
    </TableCell>
    <TableCell class="whitespace-nowrap pl-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVerticalIcon class="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <EyeIcon class="size-4" />
            <span>Voir les détails</span>
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
