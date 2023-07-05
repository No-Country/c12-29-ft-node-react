import express,{ Application } from 'express'
import authRouter from './routes/auth'
import clientsRouter from './routes/client'
import lawyersRouter from './routes/lawyer'
import subscriptionsRouter from './routes/subscription'
import meetsRouter from './routes/meet'
import paymentsRouter from './routes/payment'

import morgan from 'morgan'
import fileUpload from 'express-fileupload'
import path from 'path'
import { verifyToken } from './utils/authUtils'
const app: Application = express()

//settings
app.set('port',3001)

//middlewares
app.use(morgan('dev'))
app.use(express.json())

const uploadDir = path.join(__dirname, '../upload');

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: uploadDir
}));

// routes
app.use('/api/auth',authRouter)
app.use('/api/clients',clientsRouter)
app.use('/api/lawyers',lawyersRouter)
app.use('/api/subscriptions',subscriptionsRouter)
app.use('/api/meets',meetsRouter)
app.use('/api/payments', paymentsRouter)
export default app