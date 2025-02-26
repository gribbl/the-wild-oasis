<script setup lang="ts">
import { store } from '~/store'
</script>

<template>
  <main class="flex min-h-screen bg-background p-5 lg:p-10">
    <div class="m-auto flex w-96 flex-col items-center gap-5">
      <img class="mb-5 h-40" :src="`logo-${store.appearance}.png`" alt="" />
      <slot />
    </div>
  </main>
</template>
