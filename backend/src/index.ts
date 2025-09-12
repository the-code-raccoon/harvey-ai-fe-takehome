import config from './config.ts'
import express from 'express'
import cors from 'cors'
import folderRouter from './routes/folder.ts'
import fileRouter from './routes/file.ts'

const app = express()

app.use(cors())
app.use(express.json())

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

app.use('/folder', folderRouter)
app.use('/file', fileRouter)

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
