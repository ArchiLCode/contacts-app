const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Подключение к MongoDB
mongoose
  .connect('mongodb://mongodb:27017/contacts-app')
  .then(() => console.log('Подключено к MongoDB'))
  .catch((err) => console.error(err))

// Маршруты
app.use('/api/contacts', require('./routes/contacts'))

// Запуск сервера
app.listen(5000, () => {
  console.log(`Сервер запущен на http://localhost:5000`)
})
