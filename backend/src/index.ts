import config from './config.ts'
import express from 'express'
import data from './data.ts'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/folder/:id', (req, res) => {
  const id = req.params.id

  if (!id || typeof id !== 'string' || !/^-?\d+$/.test(id)) {
    res.status(400).send('Invalid id')
    return
  }

  const folder = data[id]
  if (!folder || folder.type !== 'folder') {
    res.status(400).send('No folder found')
    return
  }

  const children = Object.values(data).filter((d) => d.parentFolder === folder.id)

  res.json({ ...folder, children })
})

app.patch('/folder/:id', (req, res) => {
  const id = req.params.id

  if (!id || typeof id !== 'string' || !/^-?\d+$/.test(id)) {
    res.status(400).send('Invalid id')
    return
  }

  const folder = data[id]
  if (!folder || folder.type !== 'folder') {
    res.status(400).send('No folder found')
    return
  }
  const name = req.body.name

  if (name) {
    folder.name = name
  }

  res.json(folder)
})

app.get('/folder/path/:id', (req, res) => {
  const id = req.params.id

  if (!id || typeof id !== 'string' || !/^-?\d+$/.test(id)) {
    res.status(400).send('Invalid id')
    return
  }

  const folder = data[id]
  if (!folder || folder.type !== 'folder') {
    res.status(400).send('No folder found')
    return
  }

  const path = []
  let curr = data[id]
  while (curr) {
    path.push(curr)

    if (curr.parentFolder) {
      curr = data[curr.parentFolder]
    } else {
      break
    }
  }

  res.json({ path: path.reverse() })
})

app.get('/folder/path/:id', (req, res) => {
  const id = req.params.id

  if (!id || typeof id !== 'string' || !/^-?\d+$/.test(id)) {
    res.status(400).send('Invalid id')
    return
  }

  const folder = data[id]
  if (!folder || folder.type !== 'folder') {
    res.status(400).send('No folder found')
    return
  }

  // Generate breadcrumb path from currentId back to root
  const path = []
  let curr = data[id]
  while (curr) {
    path.push(curr)

    if (curr.parentFolder) {
      curr = data[curr.parentFolder]
    } else {
      break
    }
  }

  res.json({ path: path.reverse() })
})

app.get('/file/:id', (req, res) => {
  const id = req.params.id

  if (!id || typeof id !== 'string' || !/^-?\d+$/.test(id)) {
    res.status(400).send('Invalid id')
    return
  }

  const file = data[id]
  if (!file || file.type !== 'file') {
    res.status(400).send('No file found')
    return
  }

  res.json(file)
})

app.patch('/file/:id', (req, res) => {
  const id = req.params.id

  if (!id || typeof id !== 'string' || !/^-?\d+$/.test(id)) {
    res.status(400).send('Invalid id')
    return
  }

  const file = data[id]
  if (!file || file.type !== 'file') {
    res.status(400).send('No file found')
    return
  }
  const name = req.body.name

  if (name) {
    file.name = name
  }

  res.json(file)
})

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
