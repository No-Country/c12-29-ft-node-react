import express,{ Application } from 'express'
import authRouter from './routes/auth'
import clientRouter from './routes/client'
import lawyersRouter from './routes/lawyer'
import subscriptionRouter from './routes/subscription'
import meetsRouter from './routes/meet'
import morgan from 'morgan'
import { verifyToken } from './utils/authUtils'

const app: Application = express()

//settings
app.set('port',3001)

//middlewares
app.use(morgan('dev'))
app.use(express.json())
// routes
app.use('/api/auth',authRouter)
app.use('/api/clients',clientRouter)
app.use('/api/lawyers',lawyersRouter)
app.use('/api/subscriptions',subscriptionRouter)
app.use('/api/meets',meetsRouter)

export default app