<script setup lang="ts">
import type CottageDto from '#dtos/cottage'
import { ref, watch } from 'vue'
import CottageTableRow from './CottageTableRow.vue'
import { router, useForm } from '@inertiajs/vue3'
import DestroyCottageModal from './DestroyCottageModal.vue'

defineProps<{ cottages: CottageDto[] }>()

const isDeletionDialogOpen = ref(false)
const cottageToDeleteId = ref<number | null>(null)

function openDeletionDialog(id: number) {
  cottageToDeleteId.value = id
  isDeletionDialogOpen.value = true
}

function confirmDeletion() {
  if (cottageToDeleteId.value) {
    router.delete(`/cottages/${cottageToDeleteId.value}`, {
      onSuccess: () => {
        cottageToDeleteId.value = null
      },
    })
  }
}

function cancelDeletion() {
  cottageToDeleteId.value = null
}

const editForm = useForm({
  name: '',
  capacity: [2],
  price: 250,
  discountPercentage: 0.0,
  description: '',
  image: null,
})

const isEditingDialogOpen = ref(false)
const cottageToEditId = ref<number | null>(null)

function openEditingDialog(cottage: CottageDto) {
  isEditingDialogOpen.value = true
  cottageToEditId.value = cottage.id
  editForm.name = cottage.name
  editForm.capacity = [cottage.capacity]
  editForm.price = cottage.price
  editForm.discountPercentage = cottage.discount
  editForm.description = cottage.description
}

function editCottage() {
  editForm.put(`/cottages/${cottageToEditId.value}`, {
    onSuccess: () => {
      isEditingDialogOpen.value = false
      cottageToEditId.value = null
      editForm.reset()
    },
  })
}

watch(isEditingDialogOpen, (value) => {
  if (!value) {
    cottageToEditId.value = null
    editForm.clearErrors()
  }
})
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
          @edit="openEditingDialog"
          @delete="openDeletionDialog"
        />
      </TableBody>
    </Table>
  </div>

  <DestroyCottageModal
    v-model:open="isDeletionDialogOpen"
    @cancel="cancelDeletion"
    @confirm="confirmDeletion"
  />

  <EditCottageModal v-model:open="isEditingDialogOpen" :form="editForm" @edit="editCottage" />
</template>
