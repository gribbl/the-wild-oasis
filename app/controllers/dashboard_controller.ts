import { DashboardService, PERIODS } from '#services/dashboard_service'
import { dashboardFilterValidator } from '#validators/dashboard'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  @inject()
  async handle({ request, inertia }: HttpContext, dashboardService: DashboardService) {
    const filters = await request.validateUsing(dashboardFilterValidator)
    const period = filters.period || PERIODS.LAST_180_DAYS

    const data = await dashboardService.getData(period)

    return inertia.render('dashboard', { filters, ...data })
  }
}
