<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { MenuIcon } from 'lucide-vue-next'
import { VisuallyHidden } from 'radix-vue'
import { store } from '~/store'

defineProps<{
  links: { name: string; href: string; icon: any }[]
}>()
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button class="text-muted-foreground hover:text-foreground xl:hidden" variant="outline">
        <MenuIcon class="size-5" />
        <span class="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <SheetHeader>
        <VisuallyHidden>
          <SheetTitle>Menu de navigation mobile</SheetTitle>
          <SheetDescription>
            Ceci est le menu de navigation mobile. Utilisez les liens pour naviguer dans
            l'application.
          </SheetDescription>
        </VisuallyHidden>
      </SheetHeader>
      <div class="grid gap-6 text-lg font-medium">
        <div class="mb-10 h-24 justify-self-center">
          <img class="h-full" :src="`/logo-${store.appearance}.png`" alt="" />
        </div>

        <nav class="flex flex-col gap-3">
          <SheetClose v-for="link in links" :key="link.name" as-child>
            <Link
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
                :class="[
                  $page.url.startsWith(link.href) ? 'text-foreground' : 'text-foreground/50',
                ]"
              >
                {{ link.name }}
              </span>
            </Link>
          </SheetClose>
        </nav>
      </div>
    </SheetContent>
  </Sheet>
</template>
