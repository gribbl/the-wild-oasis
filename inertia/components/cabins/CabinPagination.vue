<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon, Link } from 'lucide-vue-next'

defineProps<{
  previousPageUrl: string | null
  nextPageUrl: string | null
}>()
</script>

<template>
  <div v-if="previousPageUrl || nextPageUrl" class="flex items-center gap-3">
    <Button variant="outline" as-child>
      <Link
        class="flex-1"
        :class="{ 'pointer-events-none opacity-50': !previousPageUrl }"
        :href="previousPageUrl || ''"
        :aria-disabled="!previousPageUrl"
        preserve-state
        :only="['cabins']"
      >
        <ChevronLeftIcon class="size-5" />
        <span>Précédent</span>
      </Link>
    </Button>
    <Button variant="outline" as-child>
      <Link
        class="flex-1"
        :class="{ 'pointer-events-none opacity-50': !nextPageUrl }"
        :href="nextPageUrl || ''"
        :aria-disabled="!nextPageUrl"
        preserve-state
        :only="['cabins']"
      >
        <span>Suivant</span>
        <ChevronRightIcon class="size-5" />
      </Link>
    </Button>
  </div>
</template>
