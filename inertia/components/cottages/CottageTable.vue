<script setup lang="ts">
import type CottageDto from '#dtos/cottage'
import { ref, watch } from 'vue'
import { router, useForm } from '@inertiajs/vue3'

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
  <div
    class="mb-5 min-w-full overflow-x-auto scroll-smooth rounded-md border border-slate-200 bg-white p-4"
  >
    <Table class="min-w-full" layout="fixed">
      <TableHeader>
        <TableRow class="font-bold uppercase">
          <TableHead class="pr-4">Cottage</TableHead>
          <TableHead class="px-4">Capacité</TableHead>
          <TableHead class="px-4">Prix</TableHead>
          <TableHead class="px-4">Remise</TableHead>
          <TableHead class="pl-4"></TableHead>
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
