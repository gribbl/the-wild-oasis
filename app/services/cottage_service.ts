import Cottage from '#models/cottage'
import { cottageFilterValidator, cottageValidator, editCottageValidator } from '#validators/cottage'
import { inject } from '@adonisjs/core'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { cuid } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import type { Infer } from '@vinejs/vine/types'
import { unlink } from 'node:fs/promises'

const RESULTS_PER_PAGE = 10
const UPLOADS_PATH = app.makePath('storage/uploads')

@inject()
export class CottageService {
  constructor(protected ctx: HttpContext) {}

  /**
   * Retrieves all cottages with filtering, sorting, and pagination.
   * @param filters Validated request query parameters.
   * @returns Paginated list of cottages.
   */
  async getCottages(filters: Infer<typeof cottageFilterValidator>) {
    const { page = 1, discountFilter = 'all', sortBy = 'name', sortOrder = 'asc' } = filters
    const query = Cottage.query().orderBy(sortBy, sortOrder)

    if (discountFilter === 'with-discount') query.where('discount', '>', 0)
    else if (discountFilter === 'no-discount') query.where('discount', '=', 0)

    const cottages = await query.paginate(page, RESULTS_PER_PAGE)

    cottages.baseUrl(this.ctx.request.url())
    cottages.queryString(this.ctx.request.qs())

    return cottages
  }

  /**
   * Creates a new cottage.
   * @param payload Validated request payload.
   * @returns The newly created cottage.
   */
  async store(payload: Infer<typeof cottageValidator>) {
    const { image, ...data } = payload

    const imageFilename = this.generateImageFilename(image)

    const cottage = await Cottage.create({
      ...data,
      imageFilename,
    })

    await this.uploadImage(image, imageFilename)

    return cottage
  }

  /**
   * Updates an existing cottage with optional image replacement.
   * @param id Cottage ID.
   * @param payload Updated data for the cottage.
   * @returns The updated cottage.
   */
  async update(id: number, payload: Infer<typeof editCottageValidator>) {
    const cottage = await Cottage.findOrFail(id)

    const { image, ...data } = payload

    const newImageFilename = image ? this.generateImageFilename(image) : cottage.imageFilename

    const oldImageFilename = cottage.imageFilename

    await cottage.merge({ ...data, imageFilename: newImageFilename }).save()

    if (image) {
      await this.uploadImage(image, newImageFilename)
      await this.deleteImage(oldImageFilename)
    }

    return cottage
  }

  /**
   * Deletes a cottage along with its associated image.
   * @param id Cottage ID.
   */
  async destroy(id: number) {
    const cottage = await Cottage.findOrFail(id)
    await cottage.delete()
    await this.deleteImage(cottage.imageFilename)
  }

  /**
   * Handles the image upload process.
   * @param image Uploaded image file.
   * @returns The saved filename.
   */
  private async uploadImage(image: MultipartFile, imageFilename: string) {
    await image.move(UPLOADS_PATH, { name: imageFilename })
  }

  /**
   * Deletes an image file from storage.
   * @param filename Name of the file to delete.
   */
  private async deleteImage(filename: string) {
    await unlink(`${UPLOADS_PATH}/${filename}`)
  }

  /**
   * Generates a unique filename for an image.
   * @param image Image file.
   * @returns Generated filename with extension.
   */
  private generateImageFilename(image: MultipartFile) {
    return cuid() + '.' + image.extname
  }
}
