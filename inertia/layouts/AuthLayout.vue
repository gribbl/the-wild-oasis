<template>
  <main class="flex min-h-screen bg-slate-50">
    <div class="m-auto flex w-96 flex-col items-center gap-5">
      <img class="mb-5 h-40" :src="'logo-light.png'" alt="" />
      <slot />
    </div>
  </main>
</template>
