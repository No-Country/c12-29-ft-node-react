import { Router } from 'express'
import { signin,signup,profile } from '../controllers/auth.controller'
import { verifyToken } from '../utils/authUtils'

const router: Router = Router()

router.post('/signup',signup)
router.post('/signin',signin)


router.get('/profile',verifyToken,profile)
// router.get('/profile',profile)

export default router