import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'remember_me_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('tokenable_id')
        .unsigned()
        .references('users.id')
        .notNullable()
        .onDelete('CASCADE')
      table.string('hash').unique().notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
      table.timestamp('expires_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
