import { BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Cabin from './cabin.js'
import Guest from './guest.js'
import { breakfastPrice } from '#config/settings'

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
  declare extrasPrice: number

  @column()
  declare status: string

  @column()
  declare hasBreakfast: boolean

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
  get discount() {
    if (!this.cabin) return null
    return this.cabin.price * this.cabin.discount
  }

  @computed()
  get accommodationPrice() {
    if (!this.cabin) return null
    return this.cabin.price * this.nights
  }

  @computed()
  get breakfastPrice() {
    return this.hasBreakfast ? this.nights * breakfastPrice : 0
  }

  @computed()
  get total() {
    if (this.accommodationPrice === null || this.discount === null) return null
    return this.accommodationPrice - this.discount + this.extrasPrice + this.breakfastPrice
  }
}
