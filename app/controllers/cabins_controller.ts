import { cabinFilterValidator, cabinValidator, editCabinValidator } from '#validators/cabin'
import type { HttpContext } from '@adonisjs/core/http'
import CabinDto from '#dtos/cabin'
import { CabinService } from '#services/cabin_service'
import { inject } from '@adonisjs/core'
import config from '@adonisjs/core/services/config'
import ForbiddenException from '#exceptions/forbidden_exception'

@inject()
export default class CabinsController {
  constructor(protected cabinService: CabinService) {}

  async index({ request, response, inertia }: HttpContext) {
    const filters = await request.validateUsing(cabinFilterValidator)

    const cabins = await this.cabinService.getCabins(filters)

    const lastPage = cabins.lastPage

    if (filters.page && filters.page > lastPage && lastPage > 0) {
      return response
        .redirect()
        .withQs({ ...request.qs(), page: lastPage })
        .toRoute('cabins.index')
    }

    return inertia.render('cabins/index', {
      cabins: CabinDto.fromPaginator(cabins),
      filters,
    })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(cabinValidator)

    if (config.get('app.demo')) {
      throw new ForbiddenException('Vous ne pouvez pas effectuer cette action en mode démo')
    }

    await this.cabinService.store(payload)

    session.flash('success', 'Le chalet a été ajouté')

    return response.redirect().withQs().back()
  }

  async destroy({ response, params, session }: HttpContext) {
    if (config.get('app.demo')) {
      throw new ForbiddenException('Vous ne pouvez pas effectuer cette action en mode démo')
    }

    await this.cabinService.destroy(params.id)

    session.flash('success', 'Le chalet a été supprimé')

    return response.redirect().back()
  }

  async update({ request, response, params, session }: HttpContext) {
    const payload = await request.validateUsing(editCabinValidator)

    if (config.get('app.demo')) {
      throw new ForbiddenException('Vous ne pouvez pas effectuer cette action en mode démo')
    }

    await this.cabinService.update(params.id, payload)

    session.flash('success', 'Le chalet a été modifié')

    return response.redirect().back()
  }
}
