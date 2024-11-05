// server/routes/contacts.js
const express = require('express')
const router = express.Router()
const Contact = require('../models/Contact')

// Получение всех контактов
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find()
    res.json(contacts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Создание нового контакта
router.post('/', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    phone: req.body.phone,
  })

  try {
    const newContact = await contact.save()
    res.status(201).json(newContact)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Удаление контакта
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).send('Контакт не найден')

    await contact.deleteOne()
    res.json({ message: 'Контакт удалён' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
