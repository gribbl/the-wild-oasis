import BookingDto from '#dtos/booking'
import Booking from '#models/booking'
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
    const booking = await Booking.query()
      .preload('cottage')
      .preload('guest')
      .where({ id: params.id })
      .firstOrFail()

    return inertia.render('bookings/show', { booking: BookingDto.fromModel(booking) })
  }

  async checkedIn({ params, response, session }: HttpContext) {
    const booking = await Booking.query().where({ id: params.id }).firstOrFail()

    switch (booking.status) {
      case 'unconfirmed':
        session.flash('success', "L'enregistrement a été effectué")
        booking.status = 'checked-in'
        break
      case 'checked-in':
        session.flash('success', "L'enregistrement a été annulé")
        booking.status = 'unconfirmed'
        break
      default:
        return response.redirect().back()
    }

    booking.save()

    return response.redirect().back()
  }

  async checkedOut({ params, response, session }: HttpContext) {
    const booking = await Booking.query().where({ id: params.id }).firstOrFail()

    switch (booking.status) {
      case 'checked-in':
        session.flash('success', 'Le départ a été enregistré')
        booking.status = 'checked-out'
        break
      case 'checked-out':
        session.flash('success', 'Le départ a été annulé')
        booking.status = 'checked-in'
        break
      default:
        return response.redirect().back()
    }

    booking.save()

    return response.redirect().back()
  }

  async status({ params, request, response, session }: HttpContext) {
    const { status } = await request.validateUsing(bookingPatchStatusValidator)
    const booking = await Booking.findOrFail(params.id)
    booking.status = status
    await booking.save()
    session.flash('success', 'Le status de la réversation a été modifié')
    return response.redirect().back()
  }
}
