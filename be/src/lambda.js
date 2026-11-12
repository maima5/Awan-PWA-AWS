// Entry point untuk AWS Lambda (di belakang API Gateway)
// Handler di konfigurasi Lambda: src/lambda.handler
const serverless = require('serverless-http')
const app = require('./app')

module.exports.handler = serverless(app)
