<script setup lang="ts">
defineProps<{ bookings: any[] }>()
</script>

<template>
  <div
    class="mb-5 min-w-full overflow-x-auto scroll-smooth rounded-md border border-slate-200 bg-white p-4"
  >
    <Table v-if="bookings.length" class="min-w-full">
      <TableHeader>
        <TableRow class="font-bold uppercase">
          <TableHead class="pr-4">Cottage</TableHead>
          <TableHead class="px-4">Guest</TableHead>
          <TableHead class="px-4">Dates</TableHead>
          <TableHead class="px-4">Status</TableHead>
          <TableHead class="px-4">Montant</TableHead>
          <TableHead class="pl-4"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <BookingTableRow v-for="booking in bookings" :key="booking.id" :booking="booking" />
      </TableBody>
    </Table>
    <span v-else class="block text-center text-sm text-muted-foreground">Aucune réservation</span>
  </div>
</template>
