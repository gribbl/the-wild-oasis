import User from '#models/user'
import { loginValidator } from '#validators/auth'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async store({ request, response, auth, session }: HttpContext) {
    const { email, password, remember } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user, remember)

    session.flash('success', 'Vous êtes connecté.')

    return response.redirect().toRoute('dashboard')
  }

  async destroy({ response, auth, session }: HttpContext) {
    await auth.use('web').logout()

    session.flash('success', 'Vous êtes déconnecté.')

    return response.redirect().toRoute('login')
  }
}
