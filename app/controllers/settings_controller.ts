import Setting from '#models/setting'
import { updateSettingValidator } from '#validators/setting'
import type { HttpContext } from '@adonisjs/core/http'

export default class SettingsController {
  async edit({ inertia }: HttpContext) {
    const settings = await Setting.firstOrFail()
    return inertia.render('settings', {
      minBookingLength: settings.minBookingLength,
      maxBookingLength: settings.maxBookingLength,
      breakfastPrice: settings.breakfastPrice,
    })
  }

  async update({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(updateSettingValidator)

    const settings = await Setting.firstOrFail()

    await settings.merge({ ...payload }).save()

    session.flash('success', 'Les paramètres ont été modifiés')

    return response.redirect().back()
  }
}
