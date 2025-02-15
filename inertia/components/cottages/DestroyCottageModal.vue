<script setup lang="ts">
const emit = defineEmits(['cancel', 'confirm'])
const open = defineModel<boolean>('open')
</script>

<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Supprimer un cottage</AlertDialogTitle>
        <AlertDialogDescription>
          Cette action est irréversible. Voulez-vous vraiment supprimer ce cottage ?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="emit('cancel')">Annuler</AlertDialogCancel>
        <AlertDialogAction @click="emit('confirm')">Supprimer</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
