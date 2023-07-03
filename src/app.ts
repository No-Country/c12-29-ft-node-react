import express, { Application } from 'express'
import authRouter from './routes/auth'
import morgan from 'morgan'

const app: Application = express()

//settings
app.set('port', 3001)

//middlewares
app.use(morgan('dev'))
app.use(express.json())
// routes
app.use(authRouter)


export default app