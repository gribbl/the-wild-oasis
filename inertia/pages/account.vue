<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'

const props = defineProps<{ email: string; fullname: string }>()

const updateNameForm = useForm({
  email: props.email,
  fullname: props.fullname,
})

const updatePasswordForm = useForm({
  currentPassword: '',
  password: '',
  passwordConfirm: '',
})

function submitUpdateNameForm() {
  updateNameForm.post('/account/name', { preserveScroll: true })
}

function submitUpdatePasswordForm() {
  updatePasswordForm.post('/account/password', {
    preserveScroll: true,
    onError() {
      updatePasswordForm.reset()
    },
    onSuccess() {
      updatePasswordForm.reset()
    },
  })
}
</script>

<template>
  <Head>
    <title>Mon compte</title>
    <meta name="description" content="Gérez votre compte personnel." />
  </Head>

  <div class="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
    <h1 class="text-3xl font-bold tracking-wide">Mon compte</h1>
  </div>

  <div class="mb-10 flex flex-col gap-5">
    <h2 class="text-xl font-semibold text-foreground/80">Mettre à jour mes données</h2>
    <form
      class="grid items-center gap-5 rounded border bg-background p-4 sm:grid-cols-[12rem_1fr_1fr] lg:grid-cols-[24rem_1fr_1fr]"
      @submit.prevent="submitUpdateNameForm"
      @reset.prevent="updateNameForm.reset()"
    >
      <Label class="col-start-1" for="email">Adresse email</Label>
      <Input id="email" v-model="updateNameForm.email" disabled />
      <span v-if="updateNameForm.errors.email" class="text-sm text-red-500">
        {{ updateNameForm.errors.email }}
      </span>

      <Label class="col-start-1" for="fullname">Nom</Label>
      <Input id="fullname" v-model="updateNameForm.fullname" />
      <span v-if="updateNameForm.errors.fullname" class="text-sm text-red-500">
        {{ updateNameForm.errors.fullname }}
      </span>

      <div class="flex items-center justify-end gap-3 border-t pt-5 sm:col-span-3">
        <Button variant="outline" size="lg" type="reset">Annuler</Button>
        <Button size="lg" type="submit">Confirmer</Button>
      </div>
    </form>
  </div>

  <div class="flex flex-col gap-5">
    <h2 class="text-xl font-semibold text-foreground/80">Mettre à jour mon mot de passe</h2>
    <form
      class="grid items-center gap-5 rounded border bg-background p-4 sm:grid-cols-[12rem_1fr_1fr] lg:grid-cols-[24rem_1fr_1fr]"
      @submit.prevent="submitUpdatePasswordForm"
      @reset.prevent="updatePasswordForm.reset()"
    >
      <Label class="col-start-1" for="currentPassword">Mot de passe actuel</Label>
      <Input id="currentPassword" v-model="updatePasswordForm.currentPassword" type="password" />
      <span v-if="updatePasswordForm.errors.currentPassword" class="text-sm text-red-500">
        {{ updatePasswordForm.errors.currentPassword }}
      </span>

      <Label class="col-start-1" for="password">Nouveau mot de passe</Label>
      <Input id="password" v-model="updatePasswordForm.password" type="password" />
      <span v-if="updatePasswordForm.errors.password" class="text-sm text-red-500">
        {{ updatePasswordForm.errors.password }}
      </span>

      <Label class="col-start-1" for="passwordConfirm">Confirmer mot de passe</Label>
      <Input id="passwordConfirm" v-model="updatePasswordForm.passwordConfirm" type="password" />

      <div class="self flex items-center justify-end gap-3 border-t pt-5 sm:col-span-3">
        <Button variant="outline" size="lg" type="reset">Annuler</Button>
        <Button size="lg">Confirmer</Button>
      </div>
    </form>
  </div>
</template>
