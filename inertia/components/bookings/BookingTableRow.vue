<script setup lang="ts">
import BookingDto from '#dtos/booking'
import { Link, router } from '@inertiajs/vue3'
import { EllipsisVerticalIcon, EyeIcon } from 'lucide-vue-next'
import { DateTime } from 'luxon'
import { ref, watch } from 'vue'

const { booking } = defineProps<{ booking: BookingDto }>()

const startAt = DateTime.fromISO(booking.startDate).setZone('Europe/Paris')
const endAt = DateTime.fromISO(booking.endDate).setZone('Europe/Paris')
const relativeTime = startAt.toRelative()

const startAtFormatted = startAt.toFormat('dd LLL yyyy', { locale: 'fr' })
const endAtFormatted = endAt.toFormat('dd LLL yyyy', { locale: 'fr' })
const dateRange = `${startAtFormatted} - ${endAtFormatted}`

const numberOfNights = Math.ceil(endAt.diff(startAt, 'day').days)

const total = `${(booking.cottage!.price - booking.cottage!.price * booking.cottage!.discount + booking.extrasPrice).toFixed(2)} €`

const status = ref(booking.status)

watch(status, (value) => {
  router.patch(`/bookings/${booking.id}/status`, { status: value }, { preserveScroll: true })
})
</script>

<template>
  <TableRow>
    <TableCell class="whitespace-nowrap pr-4 font-medium">
      {{ booking.cottage!.name }}
    </TableCell>
    <TableCell>
      <div class="flex flex-col">
        <span class="font-medium">{{ booking.guest!.fullname }}</span>
        <span class="text-muted-foreground">{{ booking.guest!.email }}</span>
      </div>
    </TableCell>
    <TableCell class="whitespace-nowrap px-4">
      <div class="flex flex-col">
        <div class="flex items-center gap-1 font-medium">
          <span data-allow-mismatch>{{ relativeTime }}</span>
          <span>&rarr;</span>
          <span>{{ numberOfNights }} nuit{{ numberOfNights > 1 ? 's' : '' }}</span>
        </div>
        <div class="text-muted-foreground" data-allow-mismatch>
          {{ dateRange }}
        </div>
      </div>
    </TableCell>
    <TableCell class="whitespace-nowrap px-4">
      <DropdownMenu>
        <DropdownMenuTrigger class="cursor-pointer">
          <Badge v-if="booking.status === 'unconfirmed'" variant="destructive">Non confirmé</Badge>
          <Badge v-if="booking.status === 'checked-in'">Enregistré</Badge>
          <Badge v-if="booking.status === 'checked-out'">Départ effectué</Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup v-model="status">
            <DropdownMenuRadioItem value="unconfirmed">Non confirmé</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="checked-in">Enregistré</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="checked-out">Départ effectué</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
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
          <DropdownMenuItem as-child>
            <Link :href="`/bookings/${booking.id}`">
              <EyeIcon class="size-4" />
              <span class="text-muted-foreground">Voir les détails</span>
            </Link>
          </DropdownMenuItem>
          <!-- <DropdownMenuItem>
            <Trash2Icon class="size-4" />
            <span>Supprimer</span>
          </DropdownMenuItem> -->
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
</template>
