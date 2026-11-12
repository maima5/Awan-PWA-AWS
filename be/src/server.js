// Entry point untuk menjalankan backend di lokal atau di EC2 / Elastic Beanstalk
const app = require('./app')
const { usingDynamo } = require('./services/db')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Backend berjalan di http://localhost:${PORT}`)
  console.log(`Database: ${usingDynamo ? `DynamoDB (${process.env.DYNAMODB_TABLE})` : 'in-memory (data hilang saat server restart)'}`)
})
