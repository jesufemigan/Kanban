import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import boardRoutes from './routes/boardRoutes.js'
import { connectDB } from './config/db.js'

connectDB()
const app = express()
app.use('/api/v1/boards', boardRoutes)

app.listen(5000, () => console.log('App is running'))