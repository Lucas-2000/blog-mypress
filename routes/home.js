import { Router } from 'express'
import { getHome } from '../controllers/HomeController.js'
const router = Router()

router.get('/', getHome)

export default router