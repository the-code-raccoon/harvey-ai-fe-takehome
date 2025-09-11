import config from './config.ts'
import express from 'express'
import data from './data.ts'
import type { DataEntity } from './types.ts'

const app = express()

app.use(express.json())

const findData = (data: DataEntity, id: string): DataEntity | null => {
  if (data.id === id) return data

  if (data.type === 'file') return null

  for (const child of data.children ?? []) {
    const result = findData(child, id)
    if (result) return result
  }

  return null
}

app.get('/folder/:id', (req, res) => {
  const id = req.params.id

  if (!id || typeof id !== 'string' || !/^-?\d+$/.test(id)) {
    res.status(400).send()
    return
  }

  const folder = findData(data, id)
  if (!folder || folder.type !== 'folder') {
    res.status(400).send()
    return
  }

  res.json(folder)
})

app.get('/file/:id', (req, res) => {
  const id = req.params.id

  if (!id || typeof id !== 'string' || !/^-?\d+$/.test(id)) {
    res.status(400).send()
    return
  }

  const file = findData(data, id)
  if (!file || file.type !== 'file') {
    res.status(400).send()
    return
  }

  res.json(file)
})

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
