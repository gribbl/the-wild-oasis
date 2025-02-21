<script setup lang="ts">
import BookingDto from '#dtos/booking'
import { Head, Link, router } from '@inertiajs/vue3'
import {
  ArrowLeftIcon,
  BadgeEuroIcon,
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

const numberOfNights = Math.ceil(endAt.diff(startAt, 'day').days)

const accommodationPrice = booking.cottage!.price * numberOfNights
const breakfastPrice = booking.hasBreakfast ? numberOfNights * 15 : 0
const discount = booking.cottage!.price * booking.cottage!.discount
const total = (accommodationPrice - discount + booking.extrasPrice + breakfastPrice).toFixed(2)

const status = ref(booking.status)

watch(status, (value) => {
  router.patch(`/bookings/${booking.id}/status`, { status: value }, { preserveScroll: true })
})
</script>

<template>
  <Head :title="`Réservation #${booking.id}`" />

  <div class="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
    <h1 class="text-3xl font-bold tracking-wide text-slate-800">Réservation #{{ booking.id }}</h1>

    <Button class="self-end" variant="ghost" as-child>
      <Link href="/bookings">
        <ArrowLeftIcon class="size-5" />
        <span>Revenir aux réservations</span>
      </Link>
    </Button>
  </div>

  <div
    class="mb-5 items-center gap-5 overflow-hidden rounded border border-muted-foreground/10 bg-white"
  >
    <div
      class="flex flex-col items-center justify-between gap-5 bg-primary p-5 md:flex-row md:p-10"
    >
      <div
        class="flex flex-col items-center gap-3 text-lg font-bold uppercase text-background md:flex-row"
      >
        <TentIcon class="size-6" />

        <span>cottage {{ booking.cottage!.name }}</span>
        <span> &ndash; </span>
        <span data-allow-mismatch>
          {{ numberOfNights }} nuit{{ numberOfNights > 1 ? 's' : '' }}
        </span>
      </div>
      <span class="text-background" data-allow-mismatch>{{ dateRange }}</span>
    </div>

    <div class="flex flex-col sm:flex-row">
      <div class="flex-1 p-5 md:p-10">
        <img
          class="size-full rounded-lg object-cover"
          :src="'/cottages/' + booking.cottage?.imageFilename"
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
            <Users2Icon class="size-6 text-primary" />
            <span class="text-lg font-medium">Nombre de personnes</span>
          </div>
          <span class="font-sono text-muted-foreground">
            {{ booking.guests }}
          </span>
        </div>

        <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div class="flex items-center gap-3">
            <CroissantIcon class="size-6 text-primary" />
            <span class="text-lg font-medium">Petit-déjeuner</span>
          </div>
          <span class="text-muted-foreground">
            {{ booking.hasBreakfast ? 'Oui' : 'Non' }}
          </span>
        </div>

        <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div class="flex items-center gap-3">
            <ClockIcon class="size-6 text-primary" />
            <span class="text-lg font-medium">Réservé le</span>
          </div>
          <span class="text-muted-foreground" data-allow-mismatch>
            {{ createdAt }}
          </span>
        </div>

        <div class="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <div class="flex items-center gap-3">
            <ClipboardIcon class="size-6 text-primary" />
            <span class="text-lg font-medium">Status</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger class="cursor-pointer" as-child>
              <Badge :variant="booking.status === 'unconfirmed' ? 'destructive' : 'default'">
                <span v-if="booking.status === 'unconfirmed'">Non confirmé</span>
                <span v-if="booking.status === 'checked-in'">Enregistré</span>
                <span v-if="booking.status === 'checked-out'">Départ effectué</span>
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup v-model="status">
                <DropdownMenuRadioItem value="unconfirmed">Non confirmé</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="checked-in">Enregistré</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="checked-out">Départ effectué</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <div class="flex flex-col gap-3 rounded-t-lg bg-emerald-50 p-5 text-emerald-500">
            <div class="flex items-center justify-between">
              <span>Nuits</span>
              <span class="font-sono font-semibold">{{ accommodationPrice.toFixed(2) }}</span>
            </div>

            <div class="flex items-center justify-between">
              <span>Petit-déjeuner</span>
              <span class="font-sono font-semibold">{{ breakfastPrice }}</span>
            </div>

            <div class="flex items-center justify-between">
              <span>Extra</span>
              <span class="font-sono font-semibold">{{ booking.extrasPrice }}</span>
            </div>

            <div class="flex items-center justify-between">
              <span>Remise</span>
              <span class="font-sono font-semibold">{{ discount.toFixed(2) }}</span>
            </div>
          </div>
          <div
            class="flex items-center justify-between gap-5 rounded-b-lg bg-emerald-100 p-5 text-lg text-emerald-600 md:text-2xl"
          >
            <span class="font-black uppercase">Total</span>

            <div class="flex items-center gap-3">
              <span class="font-sono font-bold">{{ total }}</span>
              <BadgeEuroIcon class="size-6 md:size-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex items-center justify-end gap-3">
    <Button v-if="booking.status === 'unconfirmed'" size="lg" as-child>
      <Link as="button" method="patch" :href="`/bookings/${booking.id}/checked-in`" preserve-scroll>
        Confirmer l'enregistrement
      </Link>
    </Button>
    <Button v-if="booking.status === 'checked-in'" size="lg" variant="destructive" as-child>
      <Link as="button" method="patch" :href="`/bookings/${booking.id}/checked-in`" preserve-scroll>
        Annuler l'enregistrement
      </Link>
    </Button>
    <Button v-if="booking.status === 'checked-in'" size="lg" as-child>
      <Link
        as="button"
        method="patch"
        :href="`/bookings/${booking.id}/checked-out`"
        preserve-scroll
      >
        Confirmer le départ
      </Link>
    </Button>
    <Button v-if="booking.status === 'checked-out'" size="lg" variant="destructive" as-child>
      <Link
        as="button"
        method="patch"
        :href="`/bookings/${booking.id}/checked-out`"
        preserve-scroll
      >
        Annuler le départ
      </Link>
    </Button>
  </div>
</template>
