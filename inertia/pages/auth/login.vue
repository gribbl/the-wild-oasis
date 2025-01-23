<script setup lang="ts">
import { SharedProps } from '@adonisjs/inertia/types'
import { useForm, usePage } from '@inertiajs/vue3'
import { AlertCircleIcon } from 'lucide-vue-next'
import { computed } from 'vue'

const form = useForm({
  email: '',
  password: '',
  remember: false,
})

const page = usePage<SharedProps>()

const exceptions = computed(() => page.props.exceptions)

function submit() {
  form.post('/login', {
    onSuccess: () => {
      form.reset()
    },
    onError: () => {
      form.reset('password')
    },
  })
}
</script>

<template>
  <main class="flex min-h-screen bg-slate-50">
    <div class="m-auto flex w-96 flex-col gap-5">
      <img class="mb-5 h-24 self-center" :src="'logo-light.png'" alt="" />
      <form class="flex flex-col gap-5" @submit.prevent="submit">
        <Alert v-if="exceptions.E_INVALID_CREDENTIALS" class="mb-6" variant="destructive">
          <AlertCircleIcon class="size-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>
            Identifiants incorrects. Veuillez vérifier votre adresse e-mail et votre mot de passe,
            puis réessayer.
          </AlertDescription>
        </Alert>
        <div class="flex flex-col gap-1">
          <Label for="email">Adresse e-mail</Label>
          <Input id="email" v-model="form.email" class="bg-background" type="email" />
          <span v-if="form.errors.email" class="text-sm text-red-500">
            {{ form.errors.email[0] }}
          </span>
        </div>

        <div class="flex flex-col gap-1">
          <Label for="password">Mot de passe</Label>
          <Input id="password" v-model="form.password" class="bg-background" type="password" />
          <span v-if="form.errors.password" class="text-sm text-red-500">
            {{ form.errors.password[0] }}
          </span>
        </div>

        <Label class="self-start">
          <div class="flex items-center gap-2">
            <Checkbox v-model:checked="form.remember" />
            <span class="text-muted-foreground">Se souvenir de moi</span>
          </div>
        </Label>

        <Button>Se connecter</Button>
      </form>
    </div>
  </main>
</template>
