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
    router.get('/bookings/:id', [BookingsController, 'show']).as('bookings.show')
    router
      .patch('/bookings/:id/checked-in', [BookingsController, 'checkedIn'])
      .as('bookings.checkedIn')
    router
      .patch('/bookings/:id/checked-out', [BookingsController, 'checkedOut'])
      .as('bookings.checkedOut')

    router.patch('/bookings/:id/status', [BookingsController, 'status']).as('bookings.status')

    router.get('/cottages', [CottagesController, 'index']).as('cottages.index')
    router.post('/cottages', [CottagesController, 'store']).as('cottages.store')
    router.delete('/cottages/:id', [CottagesController, 'destroy']).as('cottages.destroy')
    router.put('/cottages/:id', [CottagesController, 'update']).as('cottages.update')
  })
  .use(middleware.auth())
