import Booking from '#models/booking'
import factory from '@adonisjs/lucid/factories'
import { DateTime } from 'luxon'
import { GuestFactory } from './guest_factory.js'

export const BookingFactory = factory
  .define(Booking, async ({ faker }) => {
    const dateCategory = faker.helpers.arrayElement(['past', 'present', 'futur'])

    let startDate
    let status

    switch (dateCategory) {
      case 'past':
        startDate = DateTime.now().minus({ days: faker.number.int({ min: 30, max: 365 }) })
        status = 'checked-out'
        break
      case 'present':
        startDate = DateTime.now().minus({ days: faker.number.int({ min: 0, max: 2 }) })
        status = 'checked-in'
        break
      case 'futur':
        startDate = DateTime.now().plus({ days: faker.number.int({ min: 30, max: 365 }) })
        status = 'unconfirmed'
        break
    }

    const endDate = startDate.plus({ days: faker.number.int({ min: 2, max: 20 }) })

    return {
      guests: faker.number.int({ min: 2, max: 10 }),
      extrasPrice: faker.number.float({ min: 50, max: 500, fractionDigits: 2 }),
      status,
      hasBreakfast: faker.datatype.boolean(),
      startDate,
      endDate,
    }
  })
  .state('checkedIn', (booking) => (booking.status = 'checked-in'))
  .state('checkedOut', (booking) => (booking.status = 'checked-out'))
  .relation('guest', () => GuestFactory)
  .build()
