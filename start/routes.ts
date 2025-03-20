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
const CabinsController = () => import('#controllers/cabins_controller')
const BookingsController = () => import('#controllers/bookings_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const SettingsController = () => import('#controllers/settings_controller')

router.on('/').redirect('/dashboard').use(middleware.auth()).as('home')

router.get('/dashboard', [DashboardController]).use(middleware.auth()).as('dashboard')

router.get('/login', [SessionController, 'create']).as('login').use(middleware.guest())
router.post('/login', [SessionController, 'store']).as('store').use(middleware.guest())
router.post('/logout', [SessionController, 'destroy']).as('logout').use(middleware.auth())

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [BookingsController, 'index']).as('index')
        router.get('/:id', [BookingsController, 'show']).as('show')
        router.patch('/:id/status', [BookingsController, 'status']).as('status')
      })
      .prefix('bookings')
      .as('bookings')

    router
      .group(() => {
        router.get('/', [CabinsController, 'index']).as('index')
        router.post('/', [CabinsController, 'store']).as('store')
        router.delete('/:id', [CabinsController, 'destroy']).as('destroy')
        router.put('/:id', [CabinsController, 'update']).as('update')
      })
      .prefix('cabins')
      .as('cabins')

    router
      .group(() => {
        router.get('/', [SettingsController, 'edit']).as('edit')
        router.post('/', [SettingsController, 'update']).as('update')
      })
      .prefix('settings')
      .as('settings')
  })
  .use(middleware.auth())
