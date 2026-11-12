// Express app (tanpa app.listen) supaya bisa dipakai di server lokal/EC2 (server.js)
// maupun di AWS Lambda (lambda.js)
require('dotenv').config({ quiet: true })
const express = require('express')
const cors = require('cors')

const healthRoutes = require('./routes/health.routes')
const itemRoutes = require('./routes/item.routes')
const errorHandler = require('./middleware/errorHandler')

const app = express()

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:4173')
  .split(',')
  .map((o) => o.trim())

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

app.use('/api/health', healthRoutes)
app.use('/api/items', itemRoutes)

app.use((req, res) => res.status(404).json({ message: 'Endpoint tidak ditemukan' }))
app.use(errorHandler)

module.exports = app
