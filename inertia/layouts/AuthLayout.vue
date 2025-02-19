<template>
  <main class="flex min-h-screen bg-muted/50 p-5 lg:p-10">
    <div class="m-auto flex w-96 flex-col items-center gap-5">
      <img class="mb-5 h-40" :src="'logo-light.png'" alt="" />
      <slot />
    </div>
  </main>
</template>
