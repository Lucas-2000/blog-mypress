import { STRING } from 'sequelize';
import connection from '../config/connection.js';

const CategoryModel = connection.define('categories', {
  title: {
    type: STRING,
    allowNull: false
  },
  slug: {
    type: STRING,
    allowNull: false
  }
})

// CategoryModel.sync()

export default CategoryModel