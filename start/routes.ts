/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const SessionController = () => import('#controllers/auth/session_controller')
const CottagesController = () => import('#controllers/cottages_controller')
const BookingsController = () => import('#controllers/bookings_controller')

router.on('/').redirect('/dashboard').use(middleware.auth()).as('home')
router.on('/dashboard').renderInertia('dashboard').use(middleware.auth()).as('dashboard')

router.get('/login', [SessionController, 'create']).as('login').use(middleware.guest())
router.post('/login', [SessionController, 'store']).as('store').use(middleware.guest())
router.post('/logout', [SessionController, 'destroy']).as('logout').use(middleware.auth())

router
  .group(() => {
    router.get('/bookings', [BookingsController, 'index']).as('bookings.index')
    router.get('/cottages', [CottagesController, 'index']).as('cottages.index')
  })
  .use(middleware.auth())
