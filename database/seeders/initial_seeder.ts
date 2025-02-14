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
        id: 1,
        name: '001',
        capacity: 2,
        price: 250,
        description: 'A cozy cabin for two',
        imageUrl: 'cabin-001.jpg',
      },
      {
        id: 2,
        name: '002',
        capacity: 2,
        price: 350,
        discount: 25,
        description: 'A spacious cabin for two',
        imageUrl: 'cabin-002.jpg',
      },
      {
        id: 3,
        name: '003',
        capacity: 4,
        price: 500,
        discount: 50,
        description: 'A cabin for a family of four',
        imageUrl: 'cabin-003.jpg',
      },
      {
        id: 4,
        name: '004',
        capacity: 4,
        price: 750,
        description: 'A cabin for a group of four',
        imageUrl: 'cabin-004.jpg',
      },
      {
        id: 5,
        name: '005',
        capacity: 6,
        price: 1000,
        discount: 100,
        description: 'A cabin for a group of six',
        imageUrl: 'cabin-005.jpg',
      },
      {
        id: 6,
        name: '006',
        capacity: 6,
        price: 1500,
        description: 'A cabin for a group of six',
        imageUrl: 'cabin-006.jpg',
      },
      {
        id: 7,
        name: '007',
        capacity: 8,
        price: 2000,
        discount: 200,
        description: 'A cabin for a group of eight',
        imageUrl: 'cabin-007.jpg',
      },
      {
        id: 8,
        name: '008',
        capacity: 10,
        price: 2500,
        description: 'A cabin for a group of ten',
        imageUrl: 'cabin-008.jpg',
      },
    ])

    const cottagesIds = cottages.map((cottage) => cottage.id)

    const guests = await GuestFactory.createMany(10)

    for (const guest of guests) {
      await BookingFactory.merge({
        cottageId: cottagesIds[Math.floor(Math.random() * cottagesIds.length)],
        guestId: guest.id,
      }).create()
    }
  }
}
