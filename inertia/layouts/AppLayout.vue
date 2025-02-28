<script setup lang="ts">
import { watchEffect } from 'vue'
import { toast } from 'vue-sonner'

type Toast = string | Record<string, string>

const props = defineProps<{ messages: Record<string, Toast> }>()

watchEffect(() => {
  const exceptions = getToastMessage(props.messages.errorsBag)
  const success = getToastMessage(props.messages.success)

  if (exceptions) toast.error('Une erreur est survenue')
  if (success) toast.success(props.messages.success)
})

function getToastMessage(toast: Toast) {
  if (typeof toast === 'string') return toast
  if (typeof toast === 'object') return Object.values(toast).at(0)
  return null
}
</script>

<template>
  <Sonner class="pointer-events-auto" />
  <slot />
</template>
