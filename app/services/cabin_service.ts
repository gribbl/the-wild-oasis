import Cabin from '#models/cabin'
import { cabinFilterValidator, cabinValidator, editCabinValidator } from '#validators/cabin'
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
export class CabinService {
  constructor(protected ctx: HttpContext) {}

  /**
   * Retrieves all cabins with filtering, sorting, and pagination.
   * @param filters Validated request query parameters.
   * @returns Paginated list of cabins.
   */
  async getCabins(filters: Infer<typeof cabinFilterValidator>) {
    const { page = 1, discountFilter = 'all', sortBy = 'name', sortOrder = 'asc' } = filters
    const query = Cabin.query().orderBy(sortBy, sortOrder)

    if (discountFilter === 'with-discount') query.where('discount', '>', 0)
    else if (discountFilter === 'no-discount') query.where('discount', '=', 0)

    const cabins = await query.paginate(page, RESULTS_PER_PAGE)

    cabins.baseUrl(this.ctx.request.url())
    cabins.queryString(this.ctx.request.qs())

    return cabins
  }

  /**
   * Creates a new cabin.
   * @param payload Validated request payload.
   * @returns The newly created cabin.
   */
  async store(payload: Infer<typeof cabinValidator>) {
    const { image, ...data } = payload

    const imageFilename = this.generateImageFilename(image)

    const cabin = await Cabin.create({
      ...data,
      imageFilename,
    })

    await this.uploadImage(image, imageFilename)

    return cabin
  }

  /**
   * Updates an existing cabin with optional image replacement.
   * @param id Cabin ID.
   * @param payload Updated data for the cabin.
   * @returns The updated cabin.
   */
  async update(id: number, payload: Infer<typeof editCabinValidator>) {
    const cabin = await Cabin.findOrFail(id)

    const { image, ...data } = payload

    const newImageFilename = image ? this.generateImageFilename(image) : cabin.imageFilename

    const oldImageFilename = cabin.imageFilename

    await cabin.merge({ ...data, imageFilename: newImageFilename }).save()

    if (image) {
      await this.uploadImage(image, newImageFilename)
      await this.deleteImage(oldImageFilename)
    }

    return cabin
  }

  /**
   * Deletes a cabin along with its associated image.
   * @param id Cabin ID.
   */
  async destroy(id: number) {
    const cabin = await Cabin.findOrFail(id)
    await cabin.delete()
    await this.deleteImage(cabin.imageFilename)
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
