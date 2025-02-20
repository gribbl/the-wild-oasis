<script setup lang="ts">
import { SharedProps } from '@adonisjs/inertia/types'
import { useForm, usePage } from '@inertiajs/vue3'
import { AlertCircleIcon, LoaderIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import Button from '~/components/ui/button/Button.vue'

const form = useForm({
  email: '',
  password: '',
  remember: false,
})

const page = usePage<SharedProps>()

const messages = computed(() => page.props.messages)

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
  <h1 class="mb-5 scroll-m-20 text-2xl font-semibold tracking-tight">
    Identifiez-vous pour continuer
  </h1>

  <form class="flex flex-col gap-5 self-stretch" @submit.prevent="submit">
    <Alert v-if="messages.errorsBag?.E_INVALID_CREDENTIALS" class="mb-6" variant="destructive">
      <AlertCircleIcon class="size-4" />
      <AlertTitle>Erreur</AlertTitle>
      <AlertDescription>
        Identifiants incorrects. Veuillez vérifier votre adresse e-mail et votre mot de passe, puis
        réessayer.
      </AlertDescription>
    </Alert>

    <div class="flex flex-col gap-1">
      <Label for="email">Adresse e-mail</Label>
      <Input
        id="email"
        v-model="form.email"
        class="bg-background"
        type="email"
        :disabled="form.processing"
      />
      <span v-if="form.errors.email" class="text-sm text-red-500">
        {{ form.errors.email }}
      </span>
    </div>

    <div class="flex flex-col gap-1">
      <Label for="password">Mot de passe</Label>
      <Input
        id="password"
        v-model="form.password"
        class="bg-background"
        type="password"
        :disabled="form.processing"
      />
      <span v-if="form.errors.password" class="text-sm text-red-500">
        {{ form.errors.password }}
      </span>
    </div>

    <Label class="self-start">
      <div class="flex items-center gap-2">
        <Checkbox v-model:checked="form.remember" :disabled="form.processing" />
        <span class="text-muted-foreground">Se souvenir de moi</span>
      </div>
    </Label>

    <Button :disabled="form.processing">
      <LoaderIcon v-if="form.processing" class="size-4 animate-spin" />
      <span>{{ form.processing ? 'Connexion...' : 'Se connecter' }}</span>
    </Button>
  </form>
</template>
