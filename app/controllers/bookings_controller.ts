import type { HttpContext } from '@adonisjs/core/http'

export default class BookingsController {
  async index({ inertia }: HttpContext) {
    return inertia.render('bookings/index')
  }
}
