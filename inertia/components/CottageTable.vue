<script setup lang="ts">
import type CottageDto from '#dtos/cottage'
import CottageTableRow from './CottageTableRow.vue'

defineProps<{
  cottages: CottageDto[]
}>()
</script>

<template>
  <div class="rounded-md border border-slate-200 bg-white p-4">
    <Table layout="fixed">
      <TableHeader>
        <TableRow class="font-bold uppercase">
          <TableHead>Cottage</TableHead>
          <TableHead>Capacité</TableHead>
          <TableHead>Prix</TableHead>
          <TableHead>Remise</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <CottageTableRow v-for="cottage in cottages" :key="cottage.id" :cottage />
      </TableBody>
    </Table>
  </div>
</template>
