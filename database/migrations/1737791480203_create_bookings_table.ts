import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('cottage_id')
        .unsigned()
        .references('id')
        .inTable('cottages')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('guest_id')
        .unsigned()
        .references('id')
        .inTable('guests')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('nights')
      table.integer('guests')
      table.float('extras_price')
      table.string('status')
      table.boolean('has_breakfast')
      table.text('observations')

      table.timestamp('start_date')
      table.timestamp('end_date')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
