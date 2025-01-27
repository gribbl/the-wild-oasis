import Cottage from '#models/cottage'
import type { HttpContext } from '@adonisjs/core/http'

export default class CottagesController {
  async index({ inertia }: HttpContext) {
    const cottages = await Cottage.query().orderBy('name')
    return inertia.render('cottages/index', { cottages })
  }
}
