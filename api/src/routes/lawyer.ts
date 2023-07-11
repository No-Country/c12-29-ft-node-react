import { Router } from 'express'
import {getLawyers, getLawyerById, updateLawyerData, updateLawyerImage} from '../controllers/lawyer.controller'

const router: Router = Router()

router.get('/', getLawyers)
router.get('/:_id', getLawyerById)
router.put('/:_id', updateLawyerData)
router.put('/image/:_id', updateLawyerImage)
// router.get('/profile',profile)

export default router