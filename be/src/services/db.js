// Layer database.
// - Kalau DYNAMODB_TABLE diisi di .env -> pakai Amazon DynamoDB
// - Kalau kosong -> pakai penyimpanan in-memory (untuk development tanpa akun AWS)
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  DeleteCommand
} = require('@aws-sdk/lib-dynamodb')

const TABLE = process.env.DYNAMODB_TABLE
const usingDynamo = Boolean(TABLE)

let doc
if (usingDynamo) {
  const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'ap-southeast-1' })
  doc = DynamoDBDocumentClient.from(client)
}

const memory = new Map()

async function listItems() {
  if (!usingDynamo) return [...memory.values()]
  const res = await doc.send(new ScanCommand({ TableName: TABLE }))
  return res.Items || []
}

async function getItem(id) {
  if (!usingDynamo) return memory.get(id) || null
  const res = await doc.send(new GetCommand({ TableName: TABLE, Key: { id } }))
  return res.Item || null
}

async function putItem(item) {
  if (!usingDynamo) return void memory.set(item.id, item)
  await doc.send(new PutCommand({ TableName: TABLE, Item: item }))
}

async function deleteItem(id) {
  if (!usingDynamo) return void memory.delete(id)
  await doc.send(new DeleteCommand({ TableName: TABLE, Key: { id } }))
}

module.exports = { usingDynamo, listItems, getItem, putItem, deleteItem }
