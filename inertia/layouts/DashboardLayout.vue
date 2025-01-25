<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import {
  CalendarDaysIcon,
  CircleGaugeIcon,
  HouseIcon,
  LogOutIcon,
  MoonIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-vue-next'

const links = [
  { name: 'Tableau de bord', icon: CircleGaugeIcon, href: '/dashboard' },
  { name: 'Réservations', icon: CalendarDaysIcon, href: '/bookings' },
  { name: 'Cottages', icon: HouseIcon, href: '/cabins' },
  { name: 'Utilisateurs', icon: UsersIcon, href: '/users' },
  { name: 'Paramètres', icon: SettingsIcon, href: '/settings' },
]
</script>

<template>
  <div class="grid min-h-screen grid-cols-[18rem_1fr] bg-slate-50">
    <aside class="flex flex-col items-center border-r border-slate-200 bg-white p-5">
      <img class="mb-10 h-24" :src="'logo-light.png'" alt="" />
      <nav class="flex flex-col gap-3 self-stretch">
        <Link
          v-for="link in links"
          class="group flex items-center gap-3 rounded px-5 py-3 transition hover:bg-slate-50"
          :class="{ 'bg-slate-50': $page.url.startsWith(link.href) }"
          :href="link.href"
        >
          <component
            :is="link.icon"
            class="size-6 transition group-hover:text-emerald-500"
            :class="[$page.url.startsWith(link.href) ? 'text-emerald-500' : 'text-slate-500']"
          />
          <span
            class="group-hover:font-medium group-hover:text-slate-700"
            :class="[
              $page.url.startsWith(link.href) ? 'font-medium text-slate-700' : 'text-slate-600',
            ]"
          >
            {{ link.name }}
          </span>
        </Link>
      </nav>
    </aside>
    <div>
      <div class="flex justify-end gap-5 border-b border-slate-200 bg-white px-10 py-4">
        <Link class="group rounded p-2 transition hover:bg-slate-100" href="/account">
          <UserIcon class="size-5 text-slate-600 transition group-hover:text-slate-800" />
        </Link>

        <button class="group rounded p-2 transition hover:bg-slate-100" href="/">
          <MoonIcon class="size-5 text-slate-600 transition group-hover:text-slate-800" />
        </button>

        <Link
          class="group rounded p-2 transition hover:bg-red-100"
          href="/logout"
          as="button"
          method="post"
        >
          <LogOutIcon class="size-5 text-slate-600 transition group-hover:text-red-500" />
        </Link>
      </div>
      <main class="container mx-auto p-10">
        <slot />
      </main>
    </div>
  </div>
</template>
