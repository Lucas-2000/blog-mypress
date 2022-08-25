import { Router } from 'express'
import { getCategoryBySlug, createCategories, listCategories, saveCategories, deleteCategories, editCategories, updateCategories } from '../controllers/CategoriesController.js'
import { adminAuth } from '../middlewares/adminAuth.js'
const router = Router()

router.get('/category/:slug', getCategoryBySlug)

router.get('/admin/categories/new', adminAuth, createCategories)

router.post('/categories/save', adminAuth, saveCategories)

router.get('/admin/categories', adminAuth, listCategories)

router.post('/categories/delete', adminAuth, deleteCategories)

router.get('/admin/categories/edit/:id', adminAuth, editCategories)

router.post('/categories/update/', adminAuth, updateCategories)

export default router