import Roles from '#enums/roles'
import Role from '#models/role'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        id: Roles.MEMBER,
        name: 'Member',
      },
      {
        id: Roles.ADMIN,
        name: 'Admin',
      },
    ])

    await User.create({
      fullname: 'John Doe',
      email: 'johndoe@email.io',
      password: 'motdepasse',
    })
  }
}
