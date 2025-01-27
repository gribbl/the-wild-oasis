<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { LogOutIcon, MoonIcon, UserIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="grid min-h-screen grid-cols-[18rem_1fr] bg-muted/50">
    <Sidebar />
    <div>
      <div
        class="sticky top-0 z-50 flex justify-end gap-5 border-b border-slate-200 bg-white px-10 py-4"
      >
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
      <main class="container mx-auto flex flex-col gap-10 p-10">
        <slot />
      </main>
    </div>
  </div>
</template>
