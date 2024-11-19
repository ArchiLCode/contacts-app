const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const swaggerUi = require('swagger-ui-express')

const app = express()
const swaggerFile = JSON.parse(fs.readFileSync('swagger/swagger.json'))

app.use(cors())
app.use(bodyParser.json())

mongoose
  .connect('mongodb://mongodb:27017/contacts-app')
  .then(() => console.log('Подключено к MongoDB'))
  .catch((err) => console.error(err))

app.use('/api/contacts', require('./routes/contacts'))
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(5000, () => {
  console.log(`Сервер запущен на http://188.225.58.207:5000`)
})
