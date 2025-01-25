import { defaults } from '#config/settings'
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
        min_booking_length: defaults.minBookingLength,
        max_bookin_length: defaults.maxBookingLength,
        max_guests_per_booking: defaults.maxGuestsPerBooking,
        breakfast_price: defaults.breakfastPrice,
        created_at: this.now(),
        updated_at: this.now(),
      })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
