<script setup lang="ts">
import { useForm, usePage } from '@inertiajs/vue3'
import { LoaderIcon } from 'lucide-vue-next'
import { watch } from 'vue'

const open = defineModel<boolean>('open')

const page = usePage()

const form = useForm({
  name: '',
  capacity: [2],
  price: 250,
  discountPercentage: 0.0,
  description: '',
  image: null,
})

function addCottage() {
  form.post(page.url, {
    onSuccess: () => {
      form.reset()
      open.value = false
    },
  })
}

watch(open, (value) => {
  if (!value) form.clearErrors()
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="max-w-screen-md">
      <DialogHeader>
        <DialogTitle>Ajouter un cottage</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Ajoutez un nouveau cottage en fournissant les informations requises dans le formulaire
        ci-dessous.
      </DialogDescription>

      <form
        id="form"
        class="flex flex-col gap-4 py-4"
        enctype="multipart/form-data"
        @submit.prevent="addCottage"
      >
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
              <Label class="flex flex-col gap-2">Nom</Label>
              <Input v-model="form.name" :disabled="form.processing" />
              <span v-if="form.errors.name" class="text-xs text-red-500">{{
                form.errors.name
              }}</span>
            </div>

            <NumberField
              id="price"
              v-model="form.price"
              :step="5"
              :min="5"
              :format-options="{
                style: 'currency',
                currency: 'EUR',
                currencyDisplay: 'symbol',
                currencySign: 'standard',
              }"
              :disabled="form.processing"
            >
              <Label for="price">Prix</Label>
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
              <span v-if="form.errors.price" class="text-xs text-red-500">{{
                form.errors.price
              }}</span>
            </NumberField>

            <NumberField
              id="discount"
              v-model="form.discountPercentage"
              :disabled="form.processing"
              :format-options="{
                style: 'percent',
              }"
              :min="0.0"
              :max="0.1"
              :step="0.01"
            >
              <Label for="discount">Remise</Label>
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
              <span v-if="form.errors.discountPercentage" class="text-xs text-red-500">{{
                form.errors.discountPercentage
              }}</span>
            </NumberField>

            <div class="flex flex-col gap-3">
              <Label class="flex flex-col gap-2">Capacité</Label>
              <Slider
                v-model="form.capacity"
                :default-value="[2]"
                :max="10"
                :min="2"
                :step="2"
                :disabled="form.processing"
              />
              <span class="text-sm text-muted-foreground"> {{ form.capacity[0] }} personnes </span>
              <span v-if="form.errors.capacity" class="text-xs text-red-500">{{
                form.errors.capacity
              }}</span>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <div class="flex flex-1 flex-col gap-1">
              <Label for="description">Description</Label>
              <Textarea
                id="description"
                v-model="form.description"
                class="flex-1 resize-none"
                :disabled="form.processing"
              />
              <span v-if="form.errors.description" class="text-xs text-red-500">{{
                form.errors.description
              }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <Label class="flex flex-col gap-2">Image</Label>
              <Input
                :disabled="form.processing"
                type="file"
                @input="form.image = $event.target.files[0]"
              />
              <span v-if="form.errors.image" class="text-xs text-red-500">{{
                form.errors.image
              }}</span>
            </div>
          </div>
        </div>
      </form>

      <DialogFooter>
        <Button type="submit" form="form" :disabled="form.processing">
          <LoaderIcon v-if="form.processing" class="mr-2 size-4 animate-spin" />
          <span>Ajouter le cottage</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
