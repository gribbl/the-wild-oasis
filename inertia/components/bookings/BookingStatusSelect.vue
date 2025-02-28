<script setup lang="ts">
import { CheckCheckIcon, CheckIcon, XIcon } from 'lucide-vue-next'

const status = defineModel<string>()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="cursor-pointer">
      <Button variant="outline" size="sm">
        <template v-if="status === 'unconfirmed'">
          <XIcon class="text-red-500" />
          <span>Non confirmée</span>
        </template>
        <template v-if="status === 'checked-in'">
          <CheckIcon class="text-emerald-500" />
          <span>Enregistrée</span>
        </template>
        <template v-if="status === 'checked-out'">
          <CheckCheckIcon class="text-sky-500" />
          <span>Terminée</span>
        </template>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuRadioGroup v-model="status">
        <DropdownMenuRadioItem class="!text-red-500 hover:!bg-red-500/10" value="unconfirmed">
          Non confirmée
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem
          class="!text-emerald-500 hover:!bg-emerald-500/10"
          value="checked-in"
        >
          Enregistrée
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem class="!text-sky-500 hover:!bg-sky-500/10" value="checked-out">
          Terminée
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
