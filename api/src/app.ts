import express,{ Application } from 'express'
import authRouter from './routes/auth'
import clientsRouter from './routes/client'
import lawyersRouter from './routes/lawyer'
import subscriptionsRouter from './routes/subscription'
import meetsRouter from './routes/meet'
import paymentsRouter from './routes/payment'
import specialitiesRouter from './routes/speciality'

import cors from 'cors'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'
import path from 'path'
import { verifyToken } from './utils/authUtils'
const app: Application = express()

//settings
app.set('port',3001)

//middlewares
app.use(morgan('dev'))
app.use(cors({
  origin: '*'
}));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
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
app.use('/api/specialities', specialitiesRouter)

export default app