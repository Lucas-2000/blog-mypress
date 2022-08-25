import UserModel from '../models/UserModel.js'
import bcrypt from 'bcryptjs'

const listUsers = (req, res) => {
  UserModel.findAll().then(users => {
    res.render('admin/users', {
      users: users
    })
  })
}

const createUser = (req, res) => {
  res.render('admin/users/create')
}

const saveUser = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  UserModel.findOne({
    where: {
      email: email
    }
  }).then(user => {
    if(!user) {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
    
      UserModel.create({
        email: email,
        password: hash
      }).then(() => {
        res.redirect('/')
      }).catch(err => {
        res.redirect('/')
      })
    } else {
      res.redirect('/admin/users/create')
    }
  })
}

const loginUser = (req, res) => {
  res.render('admin/users/login')
}

const doAuth = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  UserModel.findOne({
    where: {
      email: email,
    }
  }).then(user => {
    if(user) {
      let correct = bcrypt.compareSync(password, user.password)
      if(correct) {
        req.session.user = {
          id: user.id,
          email: user.email
        }
        res.redirect('/admin/articles')
      } else {
        res.redirect('/admin/login')
      }
    } else {
      res.redirect('/admin/login')
    }
  })
}

const doLogout = (req, res) => {
  req.session.user = undefined
  res.redirect('/')
}

export { listUsers, createUser, saveUser, loginUser, doAuth, doLogout }