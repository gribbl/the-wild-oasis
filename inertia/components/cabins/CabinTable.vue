<script setup lang="ts">
import type CabinDto from '#dtos/cabin'
import { ref, watch } from 'vue'
import { router } from '@inertiajs/vue3'

defineProps<{ cabins: CabinDto[] }>()

const isDeleteCabinModalOpen = ref<boolean | undefined>(false)
const cabinToDeleteId = ref<number | null>(null)

function openDeleteCabinModal(id: number) {
  cabinToDeleteId.value = id
  isDeleteCabinModalOpen.value = true
}

function confirmDeletion() {
  if (cabinToDeleteId.value) {
    router.delete(`/cabins/${cabinToDeleteId.value}`, {
      onSuccess: () => {
        cabinToDeleteId.value = null
      },
    })
  }
}

function cancelDeletion() {
  cabinToDeleteId.value = null
}

const isEditCabinModalOpen = ref<boolean | undefined>(false)

const cabinToEdit = ref<CabinDto | null>(null)

function openEditCabinModal(cabin: CabinDto) {
  isEditCabinModalOpen.value = true
  cabinToEdit.value = cabin
}

watch(isEditCabinModalOpen, (value) => {
  if (!value) cabinToEdit.value = null
})
</script>

<template>
  <div
    class="mb-5 min-w-full overflow-x-auto scroll-smooth rounded-md border border-muted-foreground/15 bg-background"
  >
    <Table v-if="cabins.length" class="min-w-full" layout="fixed">
      <TableHeader>
        <TableRow>
          <TableHead class="px-4">Chalet</TableHead>
          <TableHead class="px-4">Capacité</TableHead>
          <TableHead class="px-4">Prix</TableHead>
          <TableHead class="px-4">Remise</TableHead>
          <TableHead class="px-4"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <CabinTableRow
          v-for="cabin in cabins"
          :key="cabin.id"
          :cabin
          @edit="openEditCabinModal"
          @delete="openDeleteCabinModal"
        />
      </TableBody>
    </Table>
    <span v-else class="block text-center text-sm text-muted-foreground">Aucun cabin</span>
  </div>

  <CabinDeleteModal
    v-model:open="isDeleteCabinModalOpen"
    @cancel="cancelDeletion"
    @confirm="confirmDeletion"
  />

  <CabinFormModal v-model:open="isEditCabinModalOpen" mode="edit" :cabin="cabinToEdit" />
</template>
