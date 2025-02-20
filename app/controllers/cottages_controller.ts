import Cottage from '#models/cottage'
import { cottageFilterValidator, cottageValidator, editCottageValidator } from '#validators/cottage'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import CottageDto from '#dtos/cottage'
import { unlink } from 'node:fs/promises'
import { CottageService } from '#services/cottage_service'
import { inject } from '@adonisjs/core'

@inject()
export default class CottagesController {
  constructor(protected cottageService: CottageService) {}

  async index({ request, response, inertia }: HttpContext) {
    const filters = await request.validateUsing(cottageFilterValidator)
    const cottages = await this.cottageService.getCottages(filters)

    const lastPage = cottages.lastPage

    if (filters.page && filters.page > lastPage && lastPage > 0) {
      return response
        .redirect()
        .withQs({ ...request.qs(), page: lastPage })
        .toRoute('cottages.index')
    }

    return inertia.render('cottages/index', {
      cottages: CottageDto.fromPaginator(cottages),
      filters,
    })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(cottageValidator)

    const imageFilename = `${cuid()}.${payload.image.extname}`

    await payload.image.move(app.makePath('storage/uploads'), {
      name: imageFilename,
    })

    await Cottage.create({
      name: payload.name,
      capacity: payload.capacity,
      price: payload.price,
      discount: payload.discountPercentage,
      description: payload.description,
      imageFilename,
    })

    session.flash('success', 'Le cottage a été ajouté')

    return response.redirect().withQs().back()
  }

  async destroy({ response, params, session }: HttpContext) {
    const cottage = await Cottage.findOrFail(params.id)
    await cottage.delete()
    await unlink(app.makePath(`storage/uploads/${cottage.imageFilename}`))
    session.flash('success', 'Le cottage a été supprimé')
    return response.redirect().back()
  }

  async update({ request, response, params, session }: HttpContext) {
    const payload = await request.validateUsing(editCottageValidator)
    const cottage = await Cottage.findOrFail(params.id)

    let newImageFilename
    const oldImageFilname = cottage.imageFilename

    if (payload.image) {
      newImageFilename = `${cuid()}.${payload.image.extname}`
    }

    await cottage
      .merge({
        name: payload.name,
        capacity: payload.capacity,
        price: payload.price,
        discount: payload.discountPercentage,
        description: payload.description,
        imageFilename: newImageFilename || cottage.imageFilename,
      })
      .save()

    if (payload.image) {
      await payload.image.move(app.makePath('storage/uploads'), {
        name: newImageFilename,
      })
      await unlink(app.makePath(`storage/uploads/${oldImageFilname}`))
    }

    session.flash('success', 'Le cottage a été modifié')
    return response.redirect().back()
  }
}
