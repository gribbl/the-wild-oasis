import { cottageFilterValidator, cottageValidator, editCottageValidator } from '#validators/cottage'
import type { HttpContext } from '@adonisjs/core/http'
import CottageDto from '#dtos/cottage'
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

    await this.cottageService.store(payload)

    session.flash('success', 'Le cottage a été ajouté')

    return response.redirect().withQs().back()
  }

  async destroy({ response, params, session }: HttpContext) {
    await this.cottageService.destroy(params.id)

    session.flash('success', 'Le cottage a été supprimé')

    return response.redirect().back()
  }

  async update({ request, response, params, session }: HttpContext) {
    const payload = await request.validateUsing(editCottageValidator)

    await this.cottageService.update(params.id, payload)

    session.flash('success', 'Le cottage a été modifié')

    return response.redirect().back()
  }
}
