<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import {
  CalendarDaysIcon,
  CircleGaugeIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-vue-next'
import { VisuallyHidden } from 'radix-vue'

const links = [
  { name: 'Tableau de bord', icon: CircleGaugeIcon, href: '/dashboard' },
  { name: 'Réservations', icon: CalendarDaysIcon, href: '/bookings' },
  { name: 'Cottages', icon: HouseIcon, href: '/cottages' },
  { name: 'Utilisateurs', icon: UsersIcon, href: '/users' },
  { name: 'Paramètres', icon: SettingsIcon, href: '/settings' },
]
</script>

<template>
  <div class="flex min-h-screen flex-col bg-muted/50 xl:flex-row">
    <Sidebar :links />

    <div class="flex-1">
      <div
        class="sticky top-0 z-50 flex items-center gap-5 border-b border-slate-200 bg-white px-5 py-4 lg:px-10"
      >
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
                <SheetTitle>Mobile navigation menu</SheetTitle>
                <SheetDescription>
                  This is the mobile navigation menu. Use the links to navigate through the app.
                </SheetDescription>
              </VisuallyHidden>
            </SheetHeader>
            <div class="grid gap-6 text-lg font-medium">
              <img class="mb-10 h-24 justify-self-center" :src="'logo-light.png'" alt="" />
              <nav class="flex flex-col gap-3 self-stretch">
                <SheetClose v-for="link in links" :key="link.name" as-child>
                  <Link
                    class="group flex items-center gap-3 rounded px-5 py-3 transition hover:bg-muted-foreground/5"
                    :class="{ 'bg-muted-foreground/5': $page.url.startsWith(link.href) }"
                    :href="link.href"
                  >
                    <component
                      :is="link.icon"
                      class="size-6 transition group-hover:text-primary"
                      :class="[
                        $page.url.startsWith(link.href) ? 'text-primary' : 'text-foreground/60',
                      ]"
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

        <div class="ml-auto flex items-center gap-5">
          <Link class="group rounded p-2 transition hover:bg-muted-foreground/10" href="/account">
            <UserIcon class="size-5 text-muted-foreground transition group-hover:text-foreground" />
          </Link>

          <button class="group rounded p-2 transition hover:bg-muted-foreground/10" href="/">
            <MoonIcon class="size-5 text-muted-foreground transition group-hover:text-foreground" />
          </button>

          <Link
            class="group rounded p-2 transition hover:bg-red-100"
            href="/logout"
            as="button"
            method="post"
          >
            <LogOutIcon class="size-5 text-muted-foreground transition group-hover:text-red-500" />
          </Link>
        </div>
      </div>

      <main class="container mx-auto flex flex-col p-5 lg:p-10">
        <slot />
      </main>
    </div>
  </div>
</template>
