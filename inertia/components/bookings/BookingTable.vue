<script setup lang="ts">
import type BookingDto from '#dtos/booking'

defineProps<{ bookings: BookingDto[] }>()
</script>

<template>
  <div
    class="mb-5 min-w-full overflow-hidden overflow-x-auto scroll-smooth rounded-md border border-muted-foreground/15 bg-background"
  >
    <Table v-if="bookings.length" class="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead class="px-4">Cottage</TableHead>
          <TableHead class="px-4">Client</TableHead>
          <TableHead class="px-4">Dates</TableHead>
          <TableHead class="px-4">Status</TableHead>
          <TableHead class="px-4">Montant</TableHead>
          <TableHead class="px-4"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <BookingTableRow v-for="booking in bookings" :key="booking.id" :booking="booking" />
      </TableBody>
    </Table>
    <span v-else class="block text-center text-sm text-muted-foreground">Aucune réservation</span>
  </div>
</template>
