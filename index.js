import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import connection from './config/connection.js'
import home from './routes/home.js'
import categories from './routes/categories.js'
import articles from './routes/articles.js'
import user from './routes/user.js'
import session from 'express-session'

const app = express()
dotenv.config()

app.set('view engine', 'ejs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
  maxAge: 300000
  }
}))

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

connection
.authenticate()
.then(() => {
  console.log('db connection established')
}).catch((err) => {
  console.log(err)
})

app.use('/', home)
app.use('/', categories)
app.use('/', articles)
app.use('/', user)

app.listen(process.env.PORT, () => {
  console.log('Server listening on port ' + process.env.PORT)
})