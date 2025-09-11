import config from './config.ts'
import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (_req, res) => {
  res.send('bbbccc')
})

app.get('/a', (_req, res) => {
  res.send('111')
})

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
