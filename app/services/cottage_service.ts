import Cottage from '#models/cottage'
import { cottageFilterValidator } from '#validators/cottage'
import { inject } from '@adonisjs/core'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { cuid } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { Infer } from '@vinejs/vine/types'
import { unlink } from 'node:fs/promises'

interface CottagePayload {
  name: string
  capacity: number
  price: number
  discountPercentage: number
  description: string
  image?: MultipartFile
}

@inject()
export class CottageService {
  static RESULTS_PER_PAGE = 10

  constructor(protected ctx: HttpContext) {}

  async getCottages(filters: Infer<typeof cottageFilterValidator>) {
    const { page = 1, discount = 'all', sortBy = 'name', sortOrder = 'asc' } = filters
    const query = Cottage.query().orderBy(sortBy, sortOrder)

    if (discount === 'with-discount') query.where('discount', '>', 0)
    else if (discount === 'no-discount') query.where('discount', '=', 0)

    const cottages = await query.paginate(page, CottageService.RESULTS_PER_PAGE)

    cottages.baseUrl(this.ctx.request.url())
    cottages.queryString(this.ctx.request.qs())

    return cottages
  }

  async createCottage(payload: CottagePayload) {
    const imageFilename = await this.handleImageUpload(payload.image!)

    return Cottage.create({
      name: payload.name,
      capacity: payload.capacity,
      price: payload.price,
      discount: payload.discountPercentage,
      description: payload.description,
      imageFilename,
    })
  }

  async updateCottage(id: number, payload: CottagePayload) {
    const cottage = await Cottage.findOrFail(id)

    const newImageFilename = payload.image
      ? await this.handleImageUpload(payload.image)
      : cottage.imageFilename
    const oldImageFilename = cottage.imageFilename

    await cottage.merge({ ...payload, imageFilename: newImageFilename }).save()

    if (payload.image) await this.deleteImage(oldImageFilename)

    return cottage
  }

  async deleteCottage(id: number) {
    const cottage = await Cottage.findOrFail(id)
    await this.deleteImage(cottage.imageFilename)
    await cottage.delete()
  }

  private async handleImageUpload(image: MultipartFile) {
    const imageFilename = `${cuid()}.${image.extname}`
    await image.move(app.makePath('storage/uploads'), { name: imageFilename })

    return imageFilename
  }

  private async deleteImage(filename: string | null) {
    if (filename) await unlink(app.makePath(`storage/uploads/${filename}`))
  }
}
