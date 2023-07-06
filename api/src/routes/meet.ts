import {Router} from 'express'
import {getUserMeets,createMeet} from '../controllers/meet.controller'

const router = Router()

router.get('/:userId', getUserMeets)
router.get('/')
router.post('/:clientId', createMeet)
router.put('/')
router.delete('/')

export default router