import Booking from '#models/booking'
import factory from '@adonisjs/lucid/factories'
import { DateTime } from 'luxon'
import { GuestFactory } from './guest_factory.js'

export const BookingFactory = factory
  .define(Booking, async ({ faker }) => {
    const startDate = faker.date.soon()

    const endDate = faker.date.between({
      from: DateTime.fromJSDate(startDate).plus({ days: 1 }).toISODate()!,
      to: DateTime.fromJSDate(startDate)
        .plus({ days: Math.floor(Math.random() * 20) + 2 })
        .toISODate()!,
    })

    return {
      nights: faker.number.int({ min: 1, max: 30 }),
      guests: faker.number.int({ min: 2, max: 12 }),
      extrasPrice: faker.number.float({ min: 50, max: 500, fractionDigits: 2 }),
      status: 'unconfirmed',
      observations: faker.lorem.paragraph(),
      hasBreakfast: faker.datatype.boolean(),
      isPaid: faker.datatype.boolean(),
      startDate: DateTime.fromJSDate(startDate),
      endDate: DateTime.fromJSDate(endDate),
    }
  })
  .state('checkedIn', (booking) => (booking.status = 'checked-in'))
  .state('checkedOut', (booking) => (booking.status = 'checked-out'))
  .relation('guest', () => GuestFactory)
  .build()
