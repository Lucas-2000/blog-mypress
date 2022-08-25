import { Router } from 'express'
import { createUser, doAuth, doLogout, listUsers, loginUser, saveUser } from '../controllers/UserController.js'
import { adminAuth } from '../middlewares/adminAuth.js'
const router = Router()

router.get('/admin/users', adminAuth, listUsers)

router.get('/admin/users/create', createUser)

router.post('/users/save', saveUser)

router.get('/admin/login', loginUser)

router.post('/admin/authenticate', doAuth)

router.get('/admin/logout', doLogout)

export default router