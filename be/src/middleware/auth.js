// Middleware untuk memverifikasi token login dari Amazon Cognito.
// Frontend mengirim header: Authorization: Bearer <token>
const { CognitoJwtVerifier } = require('aws-jwt-verify')

let verifier
if (process.env.COGNITO_USER_POOL_ID && process.env.COGNITO_CLIENT_ID) {
  verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    clientId: process.env.COGNITO_CLIENT_ID,
    tokenUse: 'id'
  })
}

module.exports = async function auth(req, res, next) {
  if (!verifier) {
    return res.status(500).json({ message: 'Cognito belum dikonfigurasi di .env' })
  }
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ message: 'Token tidak ada' })

  try {
    req.user = await verifier.verify(token) // berisi sub, email, dll
    next()
  } catch {
    res.status(401).json({ message: 'Token tidak valid' })
  }
}
