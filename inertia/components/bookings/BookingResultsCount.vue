<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  perPage: number
  total: number
}>()

const start = computed(() => (props.currentPage - 1) * props.perPage + 1)
const end = computed(() => Math.min(props.currentPage * props.perPage, props.total))
</script>

<template>
  <div class="text-sm">
    Affichage de <span class="font-bold">{{ start }}</span> à
    <span class="font-bold">{{ end }}</span> sur
    <span class="font-bold">{{ total }}</span> résultats
  </div>
</template>
