const { randomUUID } = require('crypto')
const db = require('../services/db')

// Express 5 otomatis meneruskan error dari async function ke errorHandler

exports.list = async (req, res) => {
  const items = await db.listItems()
  res.json(items)
}

exports.get = async (req, res) => {
  const item = await db.getItem(req.params.id)
  if (!item) return res.status(404).json({ message: 'Item tidak ditemukan' })
  res.json(item)
}

exports.create = async (req, res) => {
  const { name } = req.body || {}
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Field "name" wajib diisi' })
  }
  const item = { id: randomUUID(), name: name.trim(), createdAt: new Date().toISOString() }
  await db.putItem(item)
  res.status(201).json(item)
}

exports.remove = async (req, res) => {
  await db.deleteItem(req.params.id)
  res.status(204).end()
}
