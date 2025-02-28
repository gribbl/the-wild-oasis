import BookingDto from '#dtos/booking'
import { BookingService } from '#services/booking_service'
import { bookingFilterValidator, bookingPatchStatusValidator } from '#validators/booking'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class BookingsController {
  constructor(protected bookingService: BookingService) {}

  async index({ request, response, inertia }: HttpContext) {
    const filters = await request.validateUsing(bookingFilterValidator)

    const bookings = await this.bookingService.getBookings(filters)

    const lastPage = bookings.lastPage

    if (filters.page && filters.page > lastPage && lastPage > 0) {
      return response
        .redirect()
        .withQs({ ...request.qs(), page: lastPage })
        .toRoute('bookings.index')
    }

    return inertia.render('bookings/index', {
      bookings: BookingDto.fromPaginator(bookings),
      filters,
    })
  }

  async show({ params, inertia }: HttpContext) {
    const booking = await this.bookingService.getBooking(params.id)

    return inertia.render('bookings/show', { booking: BookingDto.fromModel(booking) })
  }

  async status({ params, request, response, session }: HttpContext) {
    const { status } = await request.validateUsing(bookingPatchStatusValidator)

    await this.bookingService.updateStatus(params.id, status)

    session.flash('success', 'Le status de la réversation a été modifié')

    return response.redirect().withQs().back()
  }
}
