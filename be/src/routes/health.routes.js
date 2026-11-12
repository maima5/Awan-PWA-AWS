const { Router } = require('express')

const router = Router()

// GET /api/health -> cek apakah backend hidup
router.get('/', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

module.exports = router
