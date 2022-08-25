import CategoryModel from '../models/CategoryModel.js'
import ArticleModel from '../models/ArticleModel.js'
import slugify from 'slugify'

const getArticleBySlug = (req, res) => {
  const slug = req.params.slug
  ArticleModel.findOne({
    where: {
      slug: slug
    }
  }).then((article) => {
    if(article) {
      CategoryModel.findAll().then(categories => {
        res.render('article', { 
          article: article,
          categories: categories
        })
      })
    } else {
      res.redirect('/')
    }
  }).catch((err) => {
    res.redirect('/')
  })
}

const listArticles = (req, res) => {
  ArticleModel.findAll({
    include: [{ model: CategoryModel }]
  }).then((articles) => {
    res.render('admin/articles/index', {
      articles: articles
    })
  })
}

const createArticle = (req, res) => {
  CategoryModel.findAll().then((categories) => {
    res.render('admin/articles/new', {
      categories: categories
    })
  })
}

const saveArticle = (req, res) => {
  const title = req.body.title
  const body = req.body.body
  const category = req.body.category

  ArticleModel.create({
    title: title,
    slug: slugify(title).toLowerCase(),
    body: body,
    categoryId: category
  }).then(() => {
    res.redirect('/admin/articles')
  })
}

const deleteArticles = (req, res) => {
  const id = req.body.id
  if(id) {
    if(!isNaN(id)) {
      ArticleModel.destroy({
        where: { 
          id: id
        }
      }).then(() => {
        res.redirect('/admin/articles')
      })
    } else {
      res.redirect('/admin/articles')
    }
  } else {
    res.redirect('/admin/articles')
  }
}

const editArticle = (req, res) => {
  const id = req.params.id

  if(isNaN(id)) {
    res.redirect('/admin/articles')
  }

  ArticleModel.findByPk(id).then(article => {
    if(article) {
      CategoryModel.findAll().then(categories => {
        res.render('admin/articles/edit', {
          article: article,
          categories: categories
        })
      })
    } else {
      res.redirect('/admin/articles')
    }
  }).catch(err => {
    res.redirect('/admin/articles')
  })
}

const updateArticle = (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const body = req.body.body
  const category = req.body.category

  ArticleModel.update({
    title: title, 
    slug: slugify(title).toLowerCase(),
    body: body,
    categoryId: category
    }, {
    where: {
      id: id,
    }
  }).then(() => {
    res.redirect('/admin/articles')
  }).catch(err => {
    res.redirect('/')
  })
}

const paginationArticles = (req, res) => {
  const page = req.params.num
  let offset = 1;
  if(!isNaN(page) && page > 0) {
    offset = parseInt(page);
  }

  ArticleModel.findAndCountAll({
    limit: 4,
    offset: (offset * 4) - 4,
    order: [
      ['createdAt', 'DESC']
    ]
  }).then(articles => {
    let next
    if(offset + 4 >= articles.count) {
      next = false
    } else {
      next = true
    }

    const result = {
      page: parseInt(page),
      next: next,
      articles: articles
    }

    CategoryModel.findAll().then(categories => {
      res.render('admin/articles/page', {
        result: result,
        categories: categories
      })
    })
  })
}

export { getArticleBySlug, createArticle, saveArticle, listArticles, deleteArticles, editArticle, updateArticle, paginationArticles }  