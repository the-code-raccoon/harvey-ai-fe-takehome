import { Router } from 'express'
import data from '../data.ts'

const fileRouter = Router()

fileRouter.get('/:id', (req, res) => {
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

fileRouter.patch('/:id', (req, res) => {
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

fileRouter.delete('/:id', (req, res) => {
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

  delete data[id]

  res.status(204).send({})
})

export default fileRouter
