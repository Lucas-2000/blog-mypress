import { Router } from 'express'
import { getArticleBySlug, createArticle, deleteArticles, listArticles, saveArticle, editArticle, updateArticle, paginationArticles } from '../controllers/ArticlesController.js'
import { adminAuth } from '../middlewares/adminAuth.js'
const router = Router()

router.get('/:slug', getArticleBySlug)

router.get('/admin/articles', adminAuth, listArticles)

router.get('/admin/articles/new', adminAuth, createArticle)

router.post('/articles/save', adminAuth, saveArticle)

router.post('/articles/delete', adminAuth, deleteArticles)

router.get('/admin/articles/edit/:id', adminAuth, editArticle)

router.post('/articles/update', adminAuth, updateArticle)

router.get('/articles/page/:num', paginationArticles)

export default router