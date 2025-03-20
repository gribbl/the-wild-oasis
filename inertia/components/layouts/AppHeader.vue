<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { LogOutIcon, MoonIcon, SunIcon, UserIcon } from 'lucide-vue-next'
import { store } from '~/store'

defineProps<{
  links: { name: string; href: string; icon: any }[]
}>()
</script>

<template>
  <header
    class="sticky top-0 z-50 flex items-center gap-5 border-b bg-background/80 px-5 py-4 backdrop-blur lg:px-10"
  >
    <MobileMenu :links />

    <div class="ml-auto flex items-center gap-5">
      <Button as-child variant="ghost" size="icon">
        <Link href="/account" aria-label="Accéder à la page Mon compte">
          <UserIcon />
        </Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="icon" aria-label="Sélectionner un thème">
            <MoonIcon v-if="store.appearance === 'dark'" />
            <SunIcon v-if="store.appearance === 'light'" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem
            aria-label="Activer le mode clair"
            @click="store.setAppearance('light')"
          >
            Clair
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Activer le mode sombre"
            @click="store.setAppearance('dark')"
          >
            Sombre
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Activer le mode système"
            @click="store.setAppearance('auto')"
          >
            Système
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button as-child variant="ghost" size="icon" aria-label="Se déconnecter">
        <Link href="/logout" as="button" method="post">
          <LogOutIcon />
        </Link>
      </Button>
    </div>
  </header>
</template>
