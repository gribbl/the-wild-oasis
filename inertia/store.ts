import { reactive, computed } from 'vue'
import { useColorMode } from '@vueuse/core'

type Appearance = 'light' | 'dark' | 'auto'

const mode = useColorMode()

export const store = reactive({
  appearance: computed(() => mode.value as Appearance),
  setAppearance(value: Appearance) {
    mode.value = value
  },
})
