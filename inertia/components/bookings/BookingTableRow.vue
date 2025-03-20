<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import { EllipsisVerticalIcon, EyeIcon } from 'lucide-vue-next'
import { DateTime } from 'luxon'
import { ref, watch } from 'vue'
import type BookingDto from '#dtos/booking'
import { formatCurrency } from '../../utils'

const { booking } = defineProps<{ booking: BookingDto }>()

const startAt = DateTime.fromISO(booking.startDate).setZone('Europe/Paris')
const endAt = DateTime.fromISO(booking.endDate).setZone('Europe/Paris')
const relativeTime = startAt.toRelative()

const startAtFormatted = startAt.toFormat('dd LLL yyyy', { locale: 'fr' })
const endAtFormatted = endAt.toFormat('dd LLL yyyy', { locale: 'fr' })
const dateRange = `${startAtFormatted} - ${endAtFormatted}`

const nights = `${booking.nights} nuit${booking.nights > 1 ? 's' : ''}`

const status = ref<string | undefined>(booking.status)

watch(status, (value) => {
  router.patch(`/bookings/${booking.id}/status`, { status: value }, { preserveScroll: true })
})
</script>

<template>
  <TableRow>
    <TableCell class="whitespace-nowrap px-4 font-medium">
      {{ booking.cabin!.name }}
    </TableCell>
    <TableCell class="max-w-56 whitespace-nowrap px-4">
      <div class="flex flex-col">
        <span class="font-medium">{{ booking.guest!.fullname }}</span>
        <span class="overflow-hidden text-ellipsis text-muted-foreground">
          {{ booking.guest!.email }}
        </span>
      </div>
    </TableCell>
    <TableCell class="whitespace-nowrap px-4">
      <div class="flex flex-col">
        <div class="flex items-center gap-1 font-medium">
          <span data-allow-mismatch>{{ relativeTime }}</span>
          <span>&ndash;</span>
          <span>{{ nights }}</span>
        </div>
        <div class="text-muted-foreground" data-allow-mismatch>
          {{ dateRange }}
        </div>
      </div>
    </TableCell>
    <TableCell class="whitespace-nowrap px-4">
      <BookingStatusSelect v-model="status" />
    </TableCell>
    <TableCell class="whitespace-nowrap px-4 font-sono font-medium text-primary">
      {{ formatCurrency(booking.total) }}
    </TableCell>
    <TableCell class="whitespace-nowrap px-4 text-right">
      <DropdownMenu>
        <DropdownMenuTrigger class="px-4" aria-label="Afficher les actions pour cette réservation">
          <EllipsisVerticalIcon class="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem as-child aria-label="Voir les détails de la réservation">
            <Link :href="`/bookings/${booking.id}`">
              <EyeIcon class="size-4" />
              <span>Voir les détails</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
</template>
