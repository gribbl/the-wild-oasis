import Booking from '#models/booking'
import { bookingFilterValidator } from '#validators/booking'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { Infer } from '@vinejs/vine/types'
import db from '@adonisjs/lucid/services/db'

@inject()
export class BookingService {
  static RESULTS_PER_PAGE = 10

  constructor(protected ctx: HttpContext) {}

  async getBookings(filters: Infer<typeof bookingFilterValidator>) {
    const { page = 1, status = 'all', sortBy = 'date', sortOrder = 'asc' } = filters
    let query = Booking.query()
      .join('cottages', 'cottages.id', 'cottage_id')
      .join('guests', 'guests.id', 'guest_id')
      .select('bookings.*')
      .preload('cottage')
      .preload('guest')

    if (sortBy === 'date') query = query.orderBy('startDate', sortOrder)
    else if (sortBy === 'cottage') query = query.orderBy('cottages.name', sortOrder)
    else if (sortBy === 'guest') query = query.orderBy('guests.fullname', sortOrder)

    if (status === 'checked-in') query.where('status', 'checked-in')
    else if (status === 'checked-out') query.where('status', 'checked-out')
    else if (status === 'unconfirmed') query.where('status', 'unconfirmed')

    const bookings = await query.paginate(page, BookingService.RESULTS_PER_PAGE)

    bookings.baseUrl(this.ctx.request.url())
    bookings.queryString(this.ctx.request.qs())

    return bookings
  }
}
