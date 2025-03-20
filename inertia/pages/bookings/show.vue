<script setup lang="ts">
import BookingDto from '#dtos/booking'
import { Head, Link, router } from '@inertiajs/vue3'
import {
  ArrowLeftIcon,
  ClockIcon,
  CroissantIcon,
  TentIcon,
  IdCardIcon,
  MailIcon,
  Users2Icon,
  ClipboardIcon,
} from 'lucide-vue-next'
import { DateTime } from 'luxon'
import { ref, watch } from 'vue'
import { formatCurrency } from '~/utils'

type Props = {
  booking: BookingDto
}

const { booking } = defineProps<Props>()

const createdAt = DateTime.fromISO(booking.createdAt)
  .setZone('Europe/Paris')
  .toLocaleString(DateTime.DATETIME_MED)

const startAt = DateTime.fromISO(booking.startDate).setZone('Europe/Paris')
const endAt = DateTime.fromISO(booking.endDate).setZone('Europe/Paris')

const startAtFormatted = startAt.toFormat('dd LLL yyyy', { locale: 'fr' })
const endAtFormatted = endAt.toFormat('dd LLL yyyy', { locale: 'fr' })
const dateRange = `${startAtFormatted} - ${endAtFormatted}`

const nights = `${booking.nights} nuit${booking.nights > 1 ? 's' : ''}`

const status = ref(booking.status)

watch(status, (value) => {
  router.patch(`/bookings/${booking.id}/status`, { status: value }, { preserveScroll: true })
})
</script>

<template>
  <Head :title="`Réservation #${booking.id}`" />

  <div class="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
    <h1 class="text-3xl font-bold tracking-wide">Réservation #{{ booking.id }}</h1>

    <Button class="self-end" variant="outline" as-child>
      <Link href="/bookings">
        <ArrowLeftIcon class="size-5" />
        <span>Revenir aux réservations</span>
      </Link>
    </Button>
  </div>

  <div class="mb-5 items-center gap-5 overflow-hidden rounded border bg-background">
    <div class="flex flex-col items-center justify-between gap-5 border-b p-5 md:flex-row md:p-10">
      <div class="flex flex-col items-center gap-3 text-lg font-bold uppercase md:flex-row">
        <TentIcon class="size-6" />

        <span>Chalet {{ booking.cabin!.name }}</span>
        <span>&ndash;</span>
        <span data-allow-mismatch>
          {{ nights }}
        </span>
      </div>
      <span data-allow-mismatch>{{ dateRange }}</span>
    </div>

    <div class="flex flex-col sm:flex-row">
      <div class="flex-1 p-5 md:p-10">
        <img
          class="size-full rounded-lg object-cover"
          :src="'/cabins/' + booking.cabin?.imageFilename"
        />
      </div>

      <div class="flex flex-1 flex-col gap-10 p-5 md:p-10">
        <div
          class="flex flex-col flex-wrap justify-between gap-5 border-b border-muted-foreground/10 pb-10 md:flex-row md:items-center"
        >
          <div class="flex items-center gap-3">
            <img
              class="size-5"
              :src="`https://flagcdn.com/${booking.guest!.countryFlag?.toLowerCase()}.svg`"
              alt=""
            />
            <span class="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
              {{ booking.guest!.fullname }}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <MailIcon class="size-5" />
            <span class="text-muted-foreground">{{ booking.guest!.email }}</span>
          </div>

          <div class="flex items-center gap-3">
            <IdCardIcon class="size-5" />
            <span class="font-sono text-muted-foreground">{{ booking.guest!.nationalId }}</span>
          </div>
        </div>

        <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div class="flex items-center gap-3">
            <Users2Icon class="size-6" />
            <span class="text-lg">Nombre de personnes</span>
          </div>
          <span class="font-sono text-muted-foreground">
            {{ booking.guests }}
          </span>
        </div>

        <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div class="flex items-center gap-3">
            <CroissantIcon class="size-6" />
            <span class="text-lg">Petit-déjeuner</span>
          </div>
          <span class="text-muted-foreground">
            {{ booking.hasBreakfast ? 'Oui' : 'Non' }}
          </span>
        </div>

        <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div class="flex items-center gap-3">
            <ClockIcon class="size-6" />
            <span class="text-lg">Réservé le</span>
          </div>
          <span class="text-muted-foreground" data-allow-mismatch>
            {{ createdAt }}
          </span>
        </div>

        <div class="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <div class="flex items-center gap-3">
            <ClipboardIcon class="size-6" />
            <span class="text-lg">Statut</span>
          </div>

          <BookingStatusSelect v-model="status" />
        </div>

        <div class="rounded border">
          <div class="flex flex-col gap-3 rounded-t-lg p-5 text-muted-foreground">
            <div class="flex items-center justify-between">
              <span>Nuits</span>
              <span class="font-sono">
                {{ formatCurrency(booking.nightsPrice) }}
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span>Petit-déjeuner</span>
              <span class="font-sono">
                {{ formatCurrency(booking.breakfastPrice) }}
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span>Extra</span>
              <span class="font-sono">{{ formatCurrency(booking.extrasPrice) }}</span>
            </div>

            <div class="flex items-center justify-between">
              <span>Remise</span>
              <span class="font-sono">
                {{ formatCurrency(booking.discountPrice) }}
              </span>
            </div>
          </div>
          <div
            class="flex items-center justify-between gap-5 rounded-b-lg border-t bg-muted/15 p-5 text-lg md:text-2xl"
          >
            <span class="font-bold">Total</span>

            <div class="flex items-center gap-3">
              <span class="font-sono font-bold">
                {{ formatCurrency(booking.total) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
