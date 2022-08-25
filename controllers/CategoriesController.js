import slugify from 'slugify'
import ArticleModel from '../models/ArticleModel.js'
import CategoryModel from '../models/CategoryModel.js'

const getCategoryBySlug = (req, res) => {
  const slug = req.params.slug
  CategoryModel.findOne({
    where: { 
      slug: slug
    },
    include: [{ model: ArticleModel }]
  }).then(category => {
    if(category) {
      CategoryModel.findAll().then(categories => {
        res.render('index', {
          articles: category.articles,
          categories: categories
        })
      })
    } else {
      res.redirect('/')
    }
  }).catch(err => {
    res.redirect('/')
  })
}

const createCategories = (req, res) => {
  res.render('admin/categories/new')
}

const saveCategories = (req, res) => {
  const title = req.body.title

  if(title) {
    CategoryModel.create({
      title: title,
      slug: slugify(title).toLowerCase()
    }).then(() => {
      res.redirect('/admin/categories')
    })

  } else {
    res.redirect('/admin/categories/new')
  }
}

const listCategories = (req, res) => {
  CategoryModel.findAll().then(categories => {
    res.render('admin/categories', {
      categories: categories
    })
  })
}

const deleteCategories = (req, res) => {
  const id = req.body.id
  if(id) {
    if(!isNaN(id)) {
      ArticleModel.destroy({
        where: { 
          categoryId: id
        }
      })

      CategoryModel.destroy({
        where: { 
          id: id
        }
      }).then(() => {
        res.redirect('/admin/categories')
      })
    } else {
      res.redirect('/admin/categories')
    }
  } else {
    res.redirect('/admin/categories')
  }
}

const editCategories = (req, res) => {
  const id = req.params.id

  if(isNaN(id)) {
    res.redirect('/admin/categories')
  }

  CategoryModel.findByPk(id).then(category => {
    if(category) {
      res.render('admin/categories/edit', {
        category: category
      })
    } else {
      res.redirect('/admin/categories')
    }
  }).catch(err => {
    res.redirect('/admin/categories')
  })
}

const updateCategories = (req, res) => {
  const id = req.body.id
  const title = req.body.title

  CategoryModel.update({title: title, slug: slugify(title).toLowerCase()}, {
    where: {
      id: id,
    }
  }).then(() => {
    res.redirect('/admin/categories')
  })
}

export { getCategoryBySlug, createCategories, saveCategories, listCategories, deleteCategories, editCategories, updateCategories }