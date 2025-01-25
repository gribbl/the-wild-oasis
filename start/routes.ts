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

router.on('/').redirect('/dashboard').use(middleware.auth()).as('home')
router.on('/dashboard').renderInertia('dashboard').use(middleware.auth()).as('dashboard')
router.on('/bookings').renderInertia('bookings').use(middleware.auth()).as('bookings')

router.get('/login', [SessionController, 'create']).as('login').use(middleware.guest())
router.post('/login', [SessionController, 'store']).as('store')
router.post('/logout', [SessionController, 'destroy']).as('logout')
