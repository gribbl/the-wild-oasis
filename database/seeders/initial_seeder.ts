import { BookingFactory } from '#database/factories/booking_factory'
import { GuestFactory } from '#database/factories/guest_factory'
import Roles from '#enums/roles'
import Cottage from '#models/cottage'
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

    const cottages = await Cottage.createMany([
      {
        name: '001',
        capacity: 2,
        price: 249.95,
        description: 'A cozy cabin for two',
        imageFilename: 'cottage-001.jpg',
      },
      {
        name: '002',
        capacity: 2,
        price: 349.95,
        discount: 0.08,
        description: 'A spacious cabin for two',
        imageFilename: 'cottage-002.jpg',
      },
      {
        name: '003',
        capacity: 4,
        price: 499.95,
        discount: 0.05,
        description: 'A cabin for a family of four',
        imageFilename: 'cottage-003.jpg',
      },
      {
        name: '004',
        capacity: 4,
        price: 749.95,
        description: 'A cabin for a group of four',
        imageFilename: 'cottage-004.jpg',
      },
      {
        name: '005',
        capacity: 6,
        price: 999.95,
        discount: 0.1,
        description: 'A cabin for a group of six',
        imageFilename: 'cottage-005.jpg',
      },
      {
        name: '006',
        capacity: 6,
        price: 1499.95,
        description: 'A cabin for a group of six',
        imageFilename: 'cottage-006.jpg',
      },
      {
        name: '007',
        capacity: 8,
        price: 1999.95,
        discount: 0.09,
        description: 'A cabin for a group of eight',
        imageFilename: 'cottage-007.jpg',
      },
      {
        name: '008',
        capacity: 10,
        price: 2499.95,
        description: 'A cabin for a group of ten',
        imageFilename: 'cottage-008.jpg',
      },
    ])

    const cottagesIds = cottages.map((cottage) => cottage.id)

    const guests = await GuestFactory.createMany(10)

    const guestsIds = guests.map((guest) => guest.id)

    await BookingFactory.tap((row) => {
      row.cottageId = cottagesIds[Math.floor(Math.random() * cottagesIds.length)]
      row.guestId = guestsIds[Math.floor(Math.random() * guestsIds.length)]
    }).createMany(20)
  }
}
