<script setup lang="ts">
import type CabinsController from '#controllers/cabins_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/vue3'
import { PlusCircleIcon } from 'lucide-vue-next'
import { ref } from 'vue'

type Props = {
  cabins: InferPageProps<CabinsController, 'index'>['cabins']
  filters: InferPageProps<CabinsController, 'index'>['filters']
}

defineProps<Props>()

const isAddCabinModalOpen = ref<boolean | undefined>(false)

const tableId = 'cabins-table'
</script>

<template>
  <Head>
    <title>Chalets</title>
    <meta name="description" content="Gérez facilement les chalets." />
  </Head>

  <div class="mb-10 flex flex-col justify-between gap-5 md:flex-row">
    <h1 class="text-center text-3xl font-bold tracking-wide sm:text-left">Chalets</h1>
    <CabinFilters :filters />
  </div>

  <CabinTable :id="tableId" :cabins="cabins.data" />

  <div class="flex flex-col-reverse justify-between gap-5 sm:flex-row lg:items-center">
    <Button class="flex items-center gap-3" @click="isAddCabinModalOpen = true">
      <PlusCircleIcon class="size-5" />
      <span>Ajouter un chalet</span>
    </Button>

    <CabinPagination
      :previous-page-url="cabins.pagination.previousPageUrl"
      :next-page-url="cabins.pagination.nextPageUrl"
      :table-id
    />
  </div>

  <CabinFormModal v-model:open="isAddCabinModalOpen" mode="add" />
</template>
