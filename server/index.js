import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { engine } from 'express-handlebars'
import { create } from 'express-handlebars'
import boardRoutes from './routes/boardRoutes.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './config/db.js'

// connectDB()
const app = express()
const hbs = create()

// Views
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))


// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

// Landing Page
app.get('/', (req, res) => {
    res.render('index')
})

// app
app.get('/free', (req, res) => {
    res.render('')
})
// Routes
app.use('/api/v1/', boardRoutes)

app.listen(5000, () => console.log('App is running'))