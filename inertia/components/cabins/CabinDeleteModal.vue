<script setup lang="ts">
const emit = defineEmits<{
  cancel: []
  confirm: []
}>()

const open = defineModel<boolean>('open')
</script>

<template>
  <AlertDialog v-model:open="open" class="z-50">
    <AlertDialogContent class="h-screen max-w-screen-sm sm:h-auto sm:w-[512px]">
      <AlertDialogHeader class="self-end">
        <AlertDialogTitle>Supprimer un chalet</AlertDialogTitle>
        <AlertDialogDescription>
          Cette action est irréversible. Voulez-vous vraiment supprimer ce chalet ?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel aria-label="Annuler la suppression du chalet" @click="emit('cancel')">
          Annuler
        </AlertDialogCancel>
        <AlertDialogAction aria-label="Confirmer la suppression du chalet" @click="emit('confirm')">
          Supprimer
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
