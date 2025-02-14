import Cottage from '#models/cottage'
import type { HttpContext } from '@adonisjs/core/http'
import CottageDto from '../dtos/cottage.js'

export default class CottagesController {
  async index({ request, response, inertia }: HttpContext) {
    const page = request.input('page', 1)
    const discount = request.input('discount', 'all')
    const sortBy = request.input('sortBy', 'name')
    const sortOrder = request.input('sortOrder', 'asc')

    const query = Cottage.query().orderBy(sortBy, sortOrder)

    if (discount === 'with-discount') {
      query.whereNotNull('discount')
    } else if (discount === 'no-discount') {
      query.whereNull('discount')
    }

    const cottages = await query.paginate(page, 10)
    const lastPage = cottages.lastPage

    cottages.baseUrl(request.url())
    cottages.queryString(request.qs())

    if (page > lastPage && lastPage > 0) {
      return response
        .redirect()
        .withQs({ ...request.qs(), page: lastPage })
        .toRoute('cottages.index')
    }

    return inertia.render('cottages/index', {
      cottages: CottageDto.fromPaginator(cottages),
      filters: request.qs(),
    })
  }
}
