import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Guest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullname: string

  @column()
  declare email: string

  @column()
  declare nationalId: string | null

  @column()
  declare nationality: string | null

  @column()
  declare countryFlag: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
