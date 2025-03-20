<script setup lang="ts">
import { CalendarDaysIcon, CircleGaugeIcon, SettingsIcon, TentIcon } from 'lucide-vue-next'

const links = [
  { name: 'Tableau de bord', icon: CircleGaugeIcon, href: '/dashboard' },
  { name: 'Réservations', icon: CalendarDaysIcon, href: '/bookings' },
  { name: 'Chalets', icon: TentIcon, href: '/cabins' },
  // { name: 'Utilisateurs', icon: UsersIcon, href: '/users' },
  { name: 'Paramètres', icon: SettingsIcon, href: '/settings' },
]
</script>

<template>
  <div class="flex min-h-screen flex-col bg-muted-foreground/5 xl:flex-row">
    <AppSidebar :links />
    <div class="flex-1">
      <AppHeader :links />
      <main class="container mx-auto flex flex-col p-5 lg:p-10">
        <slot />
      </main>
    </div>
  </div>
</template>
