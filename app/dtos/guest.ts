import Guest from '#models/guest'
import BaseDto from './base/dto.js'

export default class GuestDto extends BaseDto {
  readonly id: number
  readonly fullname: string
  readonly email: string
  readonly nationalId: string | null
  readonly nationality: string | null
  readonly countryFlag: string | null
  readonly createdAt: string
  readonly updatedAt: string

  constructor(guest: Guest) {
    super()
    this.id = guest.id
    this.fullname = guest.fullname
    this.email = guest.email
    this.nationalId = guest.nationalId
    this.nationality = guest.nationality
    this.countryFlag = guest.countryFlag
    this.createdAt = guest.createdAt.toISO()!
    this.updatedAt = guest.updatedAt.toISO()!
  }
}
