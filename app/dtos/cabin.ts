import Cabin from '#models/cabin'
import BaseDto from './base/dto.js'

export default class CabinDto extends BaseDto {
  readonly id: number
  readonly name: string
  readonly capacity: number
  readonly price: number
  readonly discount: number
  readonly description: string
  readonly imageFilename: string
  readonly createdAt: string
  readonly updatedAt: string

  constructor(cabin: Cabin) {
    super()
    this.id = cabin.id
    this.name = cabin.name
    this.capacity = cabin.capacity
    this.price = cabin.price
    this.discount = cabin.discount
    this.description = cabin.description
    this.imageFilename = cabin.imageFilename
    this.createdAt = cabin.createdAt.toISO()!
    this.updatedAt = cabin.updatedAt.toISO()!
  }
}
