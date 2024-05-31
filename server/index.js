import express from 'express'
import boardRoutes from './routes/boardRoutes.js'

const app = express()
app.use('/api/v1/boards/', boardRoutes)

app.listen(5000, () => console.log('App is running'))