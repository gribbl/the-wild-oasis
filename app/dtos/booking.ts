import Booking from '#models/booking'
import BaseDto from './base/dto.js'
import { relation } from './base/utils.js'
import CottageDto from './cabin.js'
import GuestDto from './guest.js'

export default class BookingDto extends BaseDto {
  readonly id: number
  readonly nights: number
  readonly guests: number
  readonly extrasPrice: number
  readonly status: string
  readonly hasBreakfast: boolean
  readonly discount: number | null
  readonly accommodationPrice: number | null
  readonly breakfastPrice: number | null
  readonly total: number | null
  readonly createdAt: string
  readonly startDate: string
  readonly endDate: string
  readonly cabin: CottageDto | null
  readonly guest: GuestDto | null

  constructor(booking: Booking) {
    super()
    this.id = booking.id
    this.nights = booking.nights
    this.guests = booking.guests
    this.extrasPrice = booking.extrasPrice
    this.status = booking.status
    this.hasBreakfast = booking.hasBreakfast
    this.createdAt = booking.createdAt.toISO()!
    this.startDate = booking.startDate.toISO()!
    this.endDate = booking.endDate.toISO()!
    this.discount = booking.discount
    this.accommodationPrice = booking.accommodationPrice
    this.breakfastPrice = booking.breakfastPrice
    this.total = booking.total
    this.cabin = relation(booking.cabin, CottageDto)
    this.guest = relation(booking.guest, GuestDto)
  }
}
