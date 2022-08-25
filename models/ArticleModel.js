import { STRING, TEXT } from 'sequelize';
import connection from '../config/connection.js';
import CategoryModel from './CategoryModel.js';

const ArticleModel = connection.define('articles', {
  title: {
    type: STRING,
    allowNull: false
  },
  slug: {
    type: STRING,
    allowNull: false
  },
  body: {
    type: TEXT,
    allowNull: false
  }
})

CategoryModel.hasMany(ArticleModel)
ArticleModel.belongsTo(CategoryModel)

// ArticleModel.sync()

export default ArticleModel