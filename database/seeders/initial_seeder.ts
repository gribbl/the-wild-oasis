import { BookingFactory } from '#database/factories/booking_factory'
import { GuestFactory } from '#database/factories/guest_factory'
import Roles from '#enums/roles'
import Booking from '#models/booking'
import Cabin from '#models/cabin'
import Role from '#models/role'
import Setting from '#models/setting'
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

    await Setting.create({
      minBookingLength: 2,
      maxBookingLength: 10,
      breakfastPrice: 30,
    })

    await User.create({
      fullname: 'John Doe',
      email: 'johndoe@email.io',
      password: 'motdepasse',
    })

    const cabins = await Cabin.createMany([
      {
        name: '001',
        capacity: 2,
        price: 249.95,
        description: 'A cozy cabin for two',
        imageFilename: '001.jpg',
      },
      {
        name: '002',
        capacity: 2,
        price: 349.95,
        discount: 0.08,
        description: 'A spacious cabin for two',
        imageFilename: '002.jpg',
      },
      {
        name: '003',
        capacity: 4,
        price: 499.95,
        discount: 0.05,
        description: 'A cabin for a family of four',
        imageFilename: '003.jpg',
      },
      {
        name: '004',
        capacity: 4,
        price: 749.95,
        description: 'A cabin for a group of four',
        imageFilename: '004.jpg',
      },
      {
        name: '005',
        capacity: 6,
        price: 999.95,
        discount: 0.1,
        description: 'A cabin for a group of six',
        imageFilename: '005.jpg',
      },
      {
        name: '006',
        capacity: 6,
        price: 1499.95,
        description: 'A cabin for a group of six',
        imageFilename: '006.jpg',
      },
      {
        name: '007',
        capacity: 8,
        price: 1999.95,
        discount: 0.09,
        description: 'A cabin for a group of eight',
        imageFilename: '007.jpg',
      },
      {
        name: '008',
        capacity: 10,
        price: 2499.95,
        description: 'A cabin for a group of ten',
        imageFilename: '008.jpg',
      },
    ])

    // const cabinsIds = cabins.map((cabin) => cabin.id)

    for (const cabin of cabins) {
      const bookings: Booking[] = []

      for (let i = 0; i < 20; i++) {
        while (true) {
          const guest = await GuestFactory.create()

          const newBooking = await BookingFactory.merge({
            cabinId: cabin.id,
            guestId: guest.id,
          }).make()

          const isOverlapping = bookings.some(
            (booking) =>
              (newBooking.startDate >= booking.startDate &&
                newBooking.startDate < booking.endDate) ||
              (newBooking.endDate > booking.startDate && newBooking.endDate <= booking.endDate) ||
              (newBooking.startDate <= booking.startDate && newBooking.endDate >= booking.endDate)
          )

          if (!isOverlapping) {
            bookings.push(newBooking)
            break
          }
        }
      }

      await Booking.createMany(bookings)
    }
  }
}
