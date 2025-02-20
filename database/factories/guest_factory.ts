import Guest from '#models/guest'
import factory from '@adonisjs/lucid/factories'

export const GuestFactory = factory
  .define(Guest, async ({ faker }) => {
    return {
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      nationalId: faker.number.int().toString(),
      nationality: faker.location.country(),
      countryFlag: faker.location.countryCode(),
    }
  })
  .build()
