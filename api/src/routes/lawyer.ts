import { Router } from 'express'
import {getLawyers, getLawyerById, updateLawyerData} from '../controllers/lawyer.controller'

const router: Router = Router()

router.get('/', getLawyers)
router.get('/:_id', getLawyerById)
router.put('/:_id', updateLawyerData)
// router.get('/profile',profile)

export default router