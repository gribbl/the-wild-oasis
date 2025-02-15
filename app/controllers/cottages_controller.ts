import Cottage from '#models/cottage'
import { cottageFilterValidator } from '#validators/cottage_filter'
import type { HttpContext } from '@adonisjs/core/http'
import CottageDto from '../dtos/cottage.js'

export default class CottagesController {
  async index({ request, response, inertia }: HttpContext) {
    const filters = await cottageFilterValidator.validate(request.qs())

    const page = filters.page || 1
    const discount = filters.discount || 'all'
    const sortBy = filters.sortBy || 'name'
    const sortOrder = filters.sortOrder || 'asc'

    const query = Cottage.query().orderBy(sortBy, sortOrder)

    if (discount === 'with-discount') {
      query.whereNotNull('discount')
    } else if (discount === 'no-discount') {
      query.whereNull('discount')
    }

    const cottages = await query.paginate(page, 5)
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
