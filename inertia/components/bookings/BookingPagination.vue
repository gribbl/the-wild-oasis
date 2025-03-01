<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

defineProps<{
  previousPageUrl: string | null
  nextPageUrl: string | null
}>()
</script>

<template>
  <div
    v-if="previousPageUrl || nextPageUrl"
    class="flex items-center gap-3 self-stretch sm:justify-end"
  >
    <Button variant="outline" as-child>
      <Link
        class="flex-1 sm:flex-none"
        :class="{ 'pointer-events-none opacity-50': !previousPageUrl }"
        :href="previousPageUrl || ''"
        :aria-disabled="previousPageUrl"
        preserve-state
        preserve-scroll
        :only="['bookings']"
      >
        <ChevronLeftIcon class="size-5" />
        <span>Précédent</span>
      </Link>
    </Button>

    <Button variant="outline" as-child>
      <Link
        class="flex-1 sm:flex-none"
        :class="{ 'pointer-events-none opacity-50': !nextPageUrl }"
        :href="nextPageUrl || ''"
        :aria-disabled="nextPageUrl"
        preserve-state
        preserve-scroll
        :only="['bookings']"
      >
        <span>Suivant</span>
        <ChevronRightIcon class="size-5" />
      </Link>
    </Button>
  </div>
</template>
