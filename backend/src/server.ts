// import app from './app';
import config from './config.ts'
import express from 'express'
// import itemRoutes from './routes/itemRoutes';
// import { errorHandler } from './middlewares/errorHandler';

const app = express()

app.use(express.json())

// Routes

app.get('/', (_req, res) => {
  res.send('fjdklsf')
})

app.get('/a', (_req, res) => {
  res.send('111')
})

// Global error handler (should be after routes)
// app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
