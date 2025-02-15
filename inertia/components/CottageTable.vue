<script setup lang="ts">
import type CottageDto from '#dtos/cottage'
import { ref } from 'vue'
import CottageTableRow from './CottageTableRow.vue'
import { router } from '@inertiajs/vue3'

defineProps<{
  cottages: CottageDto[]
}>()

const isDeleteDialogOpen = ref(false)
const cottageToDeleteId = ref<number | null>(null)

function openDeleteDialog(id: number) {
  cottageToDeleteId.value = id
  isDeleteDialogOpen.value = true
}

function confirmDelete() {
  if (cottageToDeleteId.value) {
    router.delete(`/cottages/${cottageToDeleteId.value}`, {
      onSuccess: () => {
        isDeleteDialogOpen.value = false
        cottageToDeleteId.value = null
      },
    })
  }
}
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
        <CottageTableRow
          v-for="cottage in cottages"
          :key="cottage.id"
          :cottage
          @delete="openDeleteDialog"
        />
      </TableBody>
    </Table>
  </div>

  <AlertDialog v-model:open="isDeleteDialogOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Supprimer un cottage</AlertDialogTitle>
        <AlertDialogDescription
          >Êtes-vous sûr de vouloir supprimer ce cottage ? Toutes les données associées à ce cottage
          seront définitivement supprimées.</AlertDialogDescription
        >
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="cottageToDeleteId = null">Annuler</AlertDialogCancel>
        <AlertDialogAction @click="confirmDelete">Supprimer</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
