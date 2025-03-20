<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { store } from '~/store'

defineProps<{
  links: { name: string; href: string; icon: any }[]
}>()
</script>

<template>
  <aside class="hidden w-72 shrink-0 border-r bg-background xl:block">
    <div class="sticky top-0 flex flex-col items-center p-5">
      <div class="mb-10 h-24">
        <img class="h-full" :src="`/logo-${store.appearance}.png`" alt="" />
      </div>
      <nav class="flex flex-col gap-3 self-stretch">
        <Link
          v-for="link in links"
          class="group flex items-center gap-3 rounded px-5 py-3 transition hover:bg-muted-foreground/5"
          :class="{ 'bg-muted-foreground/5': $page.url.startsWith(link.href) }"
          :href="link.href"
        >
          <component
            :is="link.icon"
            class="size-6 transition group-hover:text-primary"
            :class="[$page.url.startsWith(link.href) ? 'text-primary' : 'text-foreground/60']"
          />
          <span
            class="font-medium group-hover:text-foreground"
            :class="[$page.url.startsWith(link.href) ? 'text-foreground' : 'text-foreground/50']"
          >
            {{ link.name }}
          </span>
        </Link>
      </nav>
    </div>
  </aside>
</template>
