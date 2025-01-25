import config from '@adonisjs/core/services/config'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'settings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('min_booking_length').notNullable()
      table.integer('max_bookin_length').notNullable()
      table.integer('max_guests_per_booking').notNullable()
      table.integer('breakfast_price').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.defer(async (db) => {
      await db.table(this.tableName).insert({
        min_booking_length: config.get('settings.minBookingLength'),
        max_bookin_length: config.get('settings.maxBookingLength'),
        max_guests_per_booking: config.get('settings.maxGuestsPerBooking'),
        breakfast_price: config.get('settings.breakfastPrice'),
        created_at: this.now(),
        updated_at: this.now(),
      })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
