import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import swaggerAutogen from 'swagger-autogen'

const _dirname = dirname(fileURLToPath(import.meta.url))

const doc = {
  info: {
    title: 'Contacts API',
  },
  definitions: {
    // модель контакта
    Contact: {
      _id: '1',
      name: 'test',
      phone: '+7(800)555-35-35',
      __v: 0,
    },
    // модель массива контактов
    Contacts: {
      type: 'array',
      items: {
        $ref: '#/definitions/Contact',
      },
    },
    // модель объекта с текстом
    Message: {
      message: 'test',
    },
  },
  host: 'localhost:5000',
  schemes: ['http'],
}

// путь и название генерируемого файла
const outputFile = join(_dirname, 'swagger.json')
// массив путей к роутерам
const endpointsFiles = [join(_dirname, '../routes/contacts.js')]

swaggerAutogen()(outputFile, endpointsFiles, doc).then(({ success }) => {
  console.log(`Generated: ${success}`)
})
