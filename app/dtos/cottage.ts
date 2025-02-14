import Cottage from '#models/cottage'
import BaseDto from './base.js'

export default class CottageDto extends BaseDto {
  readonly id: number
  readonly name: string
  readonly capacity: number
  readonly price: number
  readonly discount: number | null
  readonly description: string | null
  readonly imageUrl: string
  readonly createdAt: string
  readonly updatedAt: string

  constructor(cottage: Cottage) {
    super()
    this.id = cottage.id
    this.name = cottage.name
    this.capacity = cottage.capacity
    this.price = cottage.price
    this.discount = cottage.discount
    this.description = cottage.description
    this.imageUrl = cottage.imageUrl
    this.createdAt = cottage.createdAt.toISO()!
    this.updatedAt = cottage.updatedAt.toISO()!
  }
}
