import Booking from '#models/booking'
import { bookingFilterValidator } from '#validators/booking'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import type { Infer } from '@vinejs/vine/types'

const RESULTS_PER_PAGE = 10

@inject()
export class BookingService {
  constructor(protected ctx: HttpContext) {}

  /**
   * Retrieves all bookings with filtering, sorting, and pagination.
   * @param filters Validated request query parameters.
   * @returns Paginated list of bookings.
   */
  async getBookings(filters: Infer<typeof bookingFilterValidator>) {
    const { page = 1, status = 'all', sortBy = 'date', sortOrder = 'asc' } = filters

    let query = Booking.query()
      .join('cabins', 'cabins.id', 'cabin_id')
      .join('guests', 'guests.id', 'guest_id')
      .select('bookings.*')
      .preload('cabin')
      .preload('guest')

    if (sortBy === 'date') query = query.orderBy('startDate', sortOrder).orderBy('guests.fullname')
    else if (sortBy === 'cabin')
      query = query.orderBy('cabins.name', sortOrder).orderBy('startDate')
    else if (sortBy === 'guest') query = query.orderBy('guests.fullname', sortOrder)

    if (status === 'checked-in') query.where('status', 'checked-in')
    else if (status === 'checked-out') query.where('status', 'checked-out')
    else if (status === 'unconfirmed') query.where('status', 'unconfirmed')

    const bookings = await query.paginate(page, RESULTS_PER_PAGE)

    bookings.baseUrl(this.ctx.request.url())
    bookings.queryString(this.ctx.request.qs())

    return bookings
  }

  /**
   * Retrieves a single booking by its ID, including associated cabin and guest data.
   *
   * @param id - The ID of the booking to retrieve.
   * @returns The booking if found.
   */
  getBooking(id: number) {
    return Booking.query().preload('cabin').preload('guest').where({ id }).firstOrFail()
  }

  /**
   * Updates the status of a booking by its ID.
   *
   * @param id - The ID of the booking to update.
   * @param status - The new status to assign to the booking.
   * @returns The updated booking.
   */
  async updateStatus(id: number, status: string) {
    const booking = await Booking.findOrFail(id)

    booking.status = status

    await booking.save()

    return booking
  }
}
