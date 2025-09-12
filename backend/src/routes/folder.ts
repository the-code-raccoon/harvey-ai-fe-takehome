import { Router } from 'express'
import data from '../data.ts'
import type { Folder } from '../types.ts'

const folderRouter = Router()

folderRouter.get('/:id', (req, res) => {
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

folderRouter.patch('/:id', (req, res) => {
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

folderRouter.delete('/:id', (req, res) => {
  const id = req.params.id

  if (!id || typeof id !== 'string' || !/^-?\d+$/.test(id)) {
    res.status(400).send('Invalid id')
    return
  }

  const folder = data[id]
  if (!folder || folder.type !== 'file') {
    res.status(400).send('No file found')
    return
  }

  function deleteRecursively(id: string) {
    for (const key in Object.values(data)) {
      if (data[key]?.parentFolder === id) {
        deleteRecursively(data[key].id) // recursively delete child
      }
    }
    delete data[id] // delete the folder/file itself
  }

  deleteRecursively(id)

  delete data[id]

  res.status(204).send({})
})

folderRouter.post('', (req, res) => {
  const { name, parentFolder } = req.body

  let id = Object.values(data).length

  while (data[id]) {
    id++
  }

  const folder = { name, parentFolder, id: String(id), type: 'folder' } satisfies Folder
  data[id] = folder

  res.json(folder)
})

folderRouter.get('/path/:id', (req, res) => {
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

export default folderRouter
