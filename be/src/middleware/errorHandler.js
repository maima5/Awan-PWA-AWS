// Menangkap semua error yang tidak tertangani di route/controller
// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {
  console.error(err)
  res.status(err.status || 500).json({ message: err.message || 'Terjadi kesalahan pada server' })
}
