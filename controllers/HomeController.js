import ArticleModel from "../models/ArticleModel.js"
import CategoryModel from "../models/CategoryModel.js"

const getHome = (req, res) => {
  ArticleModel.findAll({
    order:[ 
      ['createdAt', 'DESC']
    ], 
    limit: 4
  }).then((articles) => {
    CategoryModel.findAll().then(categories => {
      res.render('index', { 
        articles: articles,
        categories: categories
      })
    })
  })
}


export { getHome }