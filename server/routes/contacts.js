const express = require('express')
const router = express.Router()
const Contact = require('../models/Contact')

// Получение всех контактов
router.get('/', async (req, res) => {
  // #swagger.description = 'Get all contacts'

  try {
    const contacts = await Contact.find()

    /* #swagger.responses[200] = {
      description: 'Array of contacts',
      schema: { $ref: '#/definitions/Contacts' }
    } */
    res.status(200).json(contacts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Создание нового контакта
router.post('/', async (req, res) => {
  // #swagger.description = 'Create new contact'
  /* #swagger.parameters['contact'] = {
    in: 'body',
    description: 'New contact',
    required: true,
    schema: { 
      name: 'test',
      phone: '+7(800)555-35-35'
      }
  } */

  const contact = new Contact({
    name: req.body.name,
    phone: req.body.phone,
  })

  try {
    const newContact = await contact.save()

    /* #swagger.responses[201] = {
      description: 'New contact',
      schema: { $ref: '#/definitions/Contact' }
    } */
    res.status(201).json(newContact)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Удаление контакта
router.delete('/:id', async (req, res) => {
  // #swagger.description = 'Delete contact'

  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).send('Контакт не найден')

    await contact.deleteOne()

    /* #swagger.responses[200] = {
      description: 'Delete contact',
      schema: { $ref: '#/definitions/Message' }
    } */
    res.status(200).json({ message: 'Контакт удалён' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
