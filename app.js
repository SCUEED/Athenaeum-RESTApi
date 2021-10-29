const express = require('express')
app = express()

require('dotenv').config()

const database = require('./config/database')
database.authenticate()
    .then(() => console.log('Database connected'))
    .catch(error => console.log('Error: ' + error))

const category = require('./controllers/category')
const student = require('./controllers/student')
const admin = require('./controllers/admin')
const bookEntered = require('./controllers/bookEntered')
const book = require('./controllers/book')
const borrowRequest = require('./controllers/borrowRequest')
const adminRequest = require('./controllers/adminRequest')
const image = require('./controllers/image')

const security = require('./security/token')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/category', category)
app.use('/student', security.authenticateStudentAuthorization, student)
app.use('/admin', security.authenticateAdminAuthorization, admin)
app.use('/bookEntered', bookEntered)
app.use('/book', book)
app.use('/borrowRequest', borrowRequest)

app.use('/image', image)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening to Port: ${PORT}`)
})

