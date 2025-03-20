import { BaseModel, beforeSave, belongsTo, column, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Cabin from './cabin.js'
import Guest from './guest.js'
import Setting from './setting.js'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cabinId: number

  @column()
  declare guestId: number

  @column()
  declare guests: number

  @column()
  declare nightsPrice: number

  @column()
  declare discountPrice: number

  @column()
  declare extrasPrice: number

  @column()
  declare hasBreakfast: boolean

  @column()
  declare breakfastPrice: number

  @column()
  declare status: string

  @column.dateTime()
  declare startDate: DateTime

  @column.dateTime()
  declare endDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Cabin)
  declare cabin: BelongsTo<typeof Cabin>

  @belongsTo(() => Guest)
  declare guest: BelongsTo<typeof Guest>

  @computed()
  get nights() {
    const startDate = this.startDate
    const endDate = this.endDate

    return Math.ceil(Math.abs(startDate.diff(endDate, 'day').days))
  }

  @computed()
  get total() {
    return this.nightsPrice + this.breakfastPrice + this.extrasPrice - this.discountPrice
  }

  @beforeSave()
  static async calculatePrices(booking: Booking) {
    const [cabin, settings] = await Promise.all([
      Cabin.findOrFail(booking.cabinId),
      Setting.firstOrFail(),
    ])

    booking.nightsPrice = booking.nights * cabin.price
    booking.discountPrice = booking.nightsPrice * cabin.discount

    booking.breakfastPrice = booking.hasBreakfast
      ? booking.guests * booking.nights * settings.breakfastPrice
      : 0
  }
}
