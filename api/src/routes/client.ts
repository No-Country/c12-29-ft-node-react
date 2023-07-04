import { Router } from 'express'
import {getClients, getClientById, updateClientData} from '../controllers/client.controller'

const router: Router = Router()

router.get('/', getClients)
router.get('/:_id', getClientById)
router.put('/:_id', updateClientData)
// router.get('/profile',profile)

export default router