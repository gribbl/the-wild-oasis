<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import {
  CalendarDaysIcon,
  CircleGaugeIcon,
  HouseIcon,
  SettingsIcon,
  UsersIcon,
} from 'lucide-vue-next'

const links = [
  { name: 'Tableau de bord', icon: CircleGaugeIcon, href: '/dashboard' },
  { name: 'Réservations', icon: CalendarDaysIcon, href: '/bookings' },
  { name: 'Cottages', icon: HouseIcon, href: '/cottages' },
  { name: 'Utilisateurs', icon: UsersIcon, href: '/users' },
  { name: 'Paramètres', icon: SettingsIcon, href: '/settings' },
]
</script>

<template>
  <aside class="border-r border-slate-200 bg-white">
    <div class="sticky top-0 flex flex-col items-center p-5">
      <img class="mb-10 h-24" :src="'logo-light.png'" alt="" />
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
            :class="[$page.url.startsWith(link.href) ? 'text-primary' : 'text-foreground/80']"
          />
          <span
            class="group-hover:font-medium group-hover:text-foreground"
            :class="[
              $page.url.startsWith(link.href)
                ? 'font-medium text-foreground'
                : 'text-muted-foreground',
            ]"
          >
            {{ link.name }}
          </span>
        </Link>
      </nav>
    </div>
  </aside>
</template>
