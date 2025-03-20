import Booking from '#models/booking'
import BaseDto from './base/dto.js'
import { relation } from './base/utils.js'
import CottageDto from './cabin.js'
import GuestDto from './guest.js'

export default class BookingDto extends BaseDto {
  readonly id: number
  readonly nights: number
  readonly guests: number
  readonly nightsPrice: number
  readonly extrasPrice: number
  readonly hasBreakfast: boolean
  readonly breakfastPrice: number
  readonly discountPrice: number
  readonly status: string
  readonly total: number
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
    this.nightsPrice = booking.nightsPrice
    this.extrasPrice = booking.extrasPrice
    this.discountPrice = booking.discountPrice
    this.hasBreakfast = booking.hasBreakfast
    this.breakfastPrice = booking.breakfastPrice
    this.status = booking.status
    this.total = booking.total
    this.createdAt = booking.createdAt.toISO()!
    this.startDate = booking.startDate.toISO()!
    this.endDate = booking.endDate.toISO()!
    this.cabin = relation(booking.cabin, CottageDto)
    this.guest = relation(booking.guest, GuestDto)
  }
}
