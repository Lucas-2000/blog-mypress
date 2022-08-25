import { STRING } from 'sequelize';
import connection from '../config/connection.js';

const UserModel = connection.define('users', {
  email: {
    type: STRING,
    allowNull: false
  },
  password: {
    type: STRING,
    allowNull: false
  }
})

// UserModel.sync()

export default UserModel