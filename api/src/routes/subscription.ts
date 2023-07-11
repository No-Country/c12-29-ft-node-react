import { Router } from 'express'
import { getSubscriptions,createSubscription,updateSubscription,deleteSubscription } from '../controllers/subscription.controller'
const router = Router()

router.get('/',getSubscriptions)
router.post('/',createSubscription)
router.put('/:_id',updateSubscription)
router.delete('/:_id',deleteSubscription)

export default router