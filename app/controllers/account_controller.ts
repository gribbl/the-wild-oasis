import ForbiddenException from '#exceptions/forbidden_exception'
import { updateNameValidator, updatePasswordValidator } from '#validators/account'
import type { HttpContext } from '@adonisjs/core/http'
import config from '@adonisjs/core/services/config'
import hash from '@adonisjs/core/services/hash'
import { assertExists } from '@poppinss/utils/assert'

export default class AccountController {
  async edit({ inertia, auth }: HttpContext) {
    assertExists(auth.user)

    const email = auth.user.email
    const fullname = auth.user.fullname

    return inertia.render('account', { email, fullname })
  }

  async updateName({ request, response, session, auth }: HttpContext) {
    assertExists(auth.user)

    const { fullname } = await request.validateUsing(updateNameValidator)

    auth.user.fullname = fullname
    auth.user.save()

    session.flash('success', 'Votre nom a été modifié avec succès')

    return response.redirect().back()
  }

  async updatePassword({ request, response, session, auth }: HttpContext) {
    assertExists(auth.user)

    const { currentPassword, password } = await request.validateUsing(updatePasswordValidator)

    if (config.get('app.demo')) {
      throw new ForbiddenException('Vous ne pouvez pas effectuer cette action en mode démo')
    }

    const isPasswordValid = await hash.verify(auth.user.password, currentPassword)

    if (!isPasswordValid) {
      session.flash('error', 'Mot de passe actuel incorrect')
      return response.redirect().back()
    }

    auth.user.password = password
    auth.user.save()

    session.flash('success', 'Mot de passe mis à jour avec succès.')

    return response.redirect().back()
  }
}
