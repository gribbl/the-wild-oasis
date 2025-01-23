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

router.on('/').renderInertia('home').use(middleware.auth()).as('home')

router.get('/login', [SessionController, 'create']).as('login')
router.post('/login', [SessionController, 'store']).as('store')
