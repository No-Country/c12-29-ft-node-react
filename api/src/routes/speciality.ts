import {Router} from 'express'
import {getSpecialities, createSpeciality, updateSpeciality, deleteSpeciality} from '../controllers/speciality.controllers'

const router = Router()

router.get('/', getSpecialities)
router.post('/', createSpeciality)
router.put('/', updateSpeciality)
router.delete('/', deleteSpeciality)

export default router