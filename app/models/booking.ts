import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Cottage from './cottage.js'
import Guest from './guest.js'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cottageId: number

  @column()
  declare guestId: number

  @column()
  declare nights: number

  @column()
  declare guests: number

  @column()
  declare extrasPrice: number

  @column()
  declare status: string

  @column()
  declare hasBreakfast: boolean

  @column()
  declare observations: string

  @column.dateTime()
  declare startDate: DateTime

  @column.dateTime()
  declare endDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Cottage)
  declare cottage: BelongsTo<typeof Cottage>

  @belongsTo(() => Guest)
  declare guest: BelongsTo<typeof Guest>
}
