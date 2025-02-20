import { createInertiaApp } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import relativeTime from 'dayjs/plugin/relativeTime'
import { createSSRApp, h, type DefineComponent } from 'vue'
import AppLayout from './layouts/AppLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import DashboardLayout from './layouts/DashboardLayout.vue'

dayjs.extend(relativeTime)
dayjs.locale('fr')

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} - The Wild Valley`,
    resolve: (name) => {
      const pages = import.meta.glob<DefineComponent>('./pages/**/*.vue', { eager: true })
      const resolvedPage = pages[`./pages/${name}.vue`]
      resolvedPage.default.layout = [
        AppLayout,
        name.startsWith('auth') ? AuthLayout : DashboardLayout,
      ]

      return resolvedPage
    },
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin)
    },
  })
}
