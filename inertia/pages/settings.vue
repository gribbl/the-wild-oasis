<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'

const props = defineProps<{
  minBookingLength: number
  maxBookingLength: number
  breakfastPrice: number
}>()

const form = useForm({
  minBookingLength: props.minBookingLength,
  maxBookingLength: props.maxBookingLength,
  breakfastPrice: props.breakfastPrice,
})

function submit() {
  form.post('/settings')
}
</script>

<template>
  <Head>
    <title>Paramètres</title>
    <meta name="description" content="Configurez les paramètres." />
  </Head>

  <div class="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
    <h1 class="text-3xl font-bold tracking-wide">Paramètres</h1>
  </div>

  <div class="mb-10 flex flex-col gap-5">
    <form
      class="grid items-center gap-5 rounded border bg-background p-4 sm:grid-cols-[12rem_1fr_1fr] lg:grid-cols-[24rem_1fr_1fr]"
      @submit.prevent="submit"
      @reset.prevent="form.reset()"
    >
      <Label class="col-start-1" for="minBookingLength">Durée minimale du séjour (en nuits)</Label>
      <Input id="minBookingLength" v-model.number="form.minBookingLength" />
      <span v-if="form.errors.minBookingLength" class="text-xs text-red-500">
        {{ form.errors.minBookingLength }}
      </span>

      <Label class="col-start-1" for="maxBookingLength">Durée maximale du séjour (en nuits)</Label>
      <Input id="maxBookingLength" v-model.number="form.maxBookingLength" />
      <span v-if="form.errors.maxBookingLength" class="text-xs text-red-500">
        {{ form.errors.maxBookingLength }}
      </span>

      <Label class="col-start-1" for="breakfastPrice">
        Prix du petit-déjeuner (par nuit et par personne)
      </Label>
      <Input id="breakfastPrice" v-model.number="form.breakfastPrice" />
      <span v-if="form.errors.breakfastPrice" class="text-xs text-red-500">
        {{ form.errors.breakfastPrice }}
      </span>

      <div class="self flex items-center justify-end gap-3 border-t pt-5 sm:col-span-3">
        <Button variant="outline" size="lg" type="reset">Annuler</Button>
        <Button size="lg" type="submit">Confirmer</Button>
      </div>
    </form>
  </div>
</template>
