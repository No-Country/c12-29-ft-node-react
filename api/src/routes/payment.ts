import {Router} from 'express'
import {createPayment, webhook} from '../controllers/payment.controller'
const router = Router()

router.post('/subscribe', createPayment)

router.post('/webhook', webhook)
// router.post()
// router.post()

export default router