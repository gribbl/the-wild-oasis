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
  <Dialog v-model:open="open" class="z-50">
    <DialogContent
      class="flex h-screen max-w-screen-sm flex-col sm:grid sm:h-auto sm:flex-none lg:max-w-screen-md"
    >
      <DialogHeader>
        <DialogTitle>Ajouter un cottage</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Ajoutez un nouveau cottage en fournissant les informations requises dans le formulaire
        ci-dessous.
      </DialogDescription>

      <form
        id="form"
        class="flex flex-1 flex-col gap-4 md:py-4"
        enctype="multipart/form-data"
        @submit.prevent="addCottage"
      >
        <div class="flex h-full flex-col gap-4 md:flex-row">
          <div class="flex flex-col gap-4 md:flex-1">
            <div class="flex flex-col gap-1">
              <div class="flex items-center justify-between gap-3">
                <Label for="name">Nom</Label>
                <span v-if="form.errors.name" class="text-xs text-red-500 sm:hidden">
                  {{ form.errors.name }}
                </span>
              </div>
              <Input id="name" v-model="form.name" :disabled="form.processing" />
              <span v-if="form.errors.name" class="hidden text-xs text-red-500 sm:block">
                {{ form.errors.name }}
              </span>
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
              <div class="flex items-center justify-between gap-3">
                <Label for="price">Prix</Label>
                <span v-if="form.errors.price" class="text-xs text-red-500 sm:hidden">
                  {{ form.errors.price }}
                </span>
              </div>
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
              <span v-if="form.errors.price" class="hidden text-xs text-red-500 sm:block">
                {{ form.errors.price }}
              </span>
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
              <div class="flex items-center justify-between gap-3">
                <Label for="discount">Remise</Label>
                <span v-if="form.errors.discountPercentage" class="text-xs text-red-500 sm:hidden">
                  {{ form.errors.discountPercentage }}
                </span>
              </div>
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
              <span
                v-if="form.errors.discountPercentage"
                class="hidden text-xs text-red-500 sm:block"
              >
                {{ form.errors.discountPercentage }}
              </span>
            </NumberField>

            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between gap-3">
                <Label for="capacity">Capacité</Label>
                <span v-if="form.errors.capacity" class="text-xs text-red-500 sm:hidden">
                  {{ form.errors.capacity }}
                </span>
              </div>
              <Slider
                id="capacity"
                v-model="form.capacity"
                :default-value="[2]"
                :max="10"
                :min="2"
                :step="2"
                :disabled="form.processing"
              />
              <span class="text-sm text-muted-foreground"> {{ form.capacity[0] }} personnes </span>
              <span v-if="form.errors.capacity" class="hidden text-xs text-red-500 sm:block">
                {{ form.errors.capacity }}
              </span>
            </div>
          </div>

          <div class="flex flex-1 flex-col gap-4">
            <div class="flex flex-1 flex-col gap-1">
              <div class="flex items-center justify-between gap-3">
                <Label for="description">Description</Label>
                <span v-if="form.errors.description" class="text-xs text-red-500 sm:hidden">
                  {{ form.errors.description }}
                </span>
              </div>
              <Textarea
                id="description"
                v-model="form.description"
                class="flex-1 resize-none"
                :disabled="form.processing"
              />
              <span v-if="form.errors.description" class="hidden text-xs text-red-500 sm:block">
                {{ form.errors.description }}
              </span>
            </div>
            <div class="flex flex-col gap-1">
              <div class="flex items-center justify-between gap-3">
                <Label for="image">Image</Label>
                <span v-if="form.errors.image" class="text-xs text-red-500 sm:hidden">
                  {{ form.errors.image }}
                </span>
              </div>
              <Input
                id="image"
                :disabled="form.processing"
                type="file"
                @input="form.image = $event.target.files[0]"
              />
              <span v-if="form.errors.image" class="hidden text-xs text-red-500 sm:block">
                {{ form.errors.image }}
              </span>
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
