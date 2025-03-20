<script setup lang="ts">
import type BookingsController from '#controllers/bookings_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/vue3'

defineProps<{
  bookings: InferPageProps<BookingsController, 'index'>['bookings']
  filters: InferPageProps<BookingsController, 'index'>['filters']
}>()

const tableId = 'bookings-table'
</script>

<template>
  <Head>
    <title>Réservations</title>
    <meta name="description" content="Consultez et gérez toutes les réservations." />
  </Head>

  <div class="mb-10 flex flex-col justify-between gap-5 md:flex-row">
    <h1 class="text-center text-3xl font-bold tracking-wide sm:text-left">Réservations</h1>
    <BookingFilters :filters />
  </div>

  <BookingTable :id="tableId" :bookings="bookings.data" />

  <div class="flex flex-col-reverse items-center gap-3 sm:flex-row sm:justify-between">
    <BookingResultsCount
      :current-page="bookings.pagination.currentPage"
      :per-page="bookings.pagination.perPage"
      :total="bookings.pagination.total"
    />

    <BookingPagination
      :previous-page-url="bookings.pagination.previousPageUrl"
      :next-page-url="bookings.pagination.nextPageUrl"
      :table-id
    />
  </div>
</template>
