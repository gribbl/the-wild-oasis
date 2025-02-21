import Booking from '#models/booking'
import BaseDto from './base/dto.js'
import { relation } from './base/utils.js'
import CottageDto from './cottage.js'
import GuestDto from './guest.js'

export default class BookingDto extends BaseDto {
  readonly id: number
  readonly nights: number
  readonly guests: number
  readonly extrasPrice: number
  readonly status: string
  readonly hasBreakfast: boolean
  readonly observations: string
  readonly createdAt: string
  readonly startDate: string
  readonly endDate: string
  readonly cottage: CottageDto | null
  readonly guest: GuestDto | null

  constructor(booking: Booking) {
    super()
    this.id = booking.id
    this.nights = booking.nights
    this.guests = booking.guests
    this.extrasPrice = booking.extrasPrice
    this.status = booking.status
    this.hasBreakfast = booking.hasBreakfast
    this.observations = booking.observations
    this.createdAt = booking.createdAt.toISO()!
    this.startDate = booking.startDate.toISO()!
    this.endDate = booking.endDate.toISO()!
    this.cottage = relation(booking.cottage, CottageDto)
    this.guest = relation(booking.guest, GuestDto)
  }
}
