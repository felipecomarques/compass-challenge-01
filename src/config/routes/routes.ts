import { Router } from 'express'
import { Index } from '..'
import { TutorsController } from '@controller/tutorsController'
// import { login } from "../auth/authUtils";
// import { authMiddleware } from '../auth/middleware'
// import petsController from '../controller/petController'

export const router = Router()
const tutorsController = new TutorsController()

router.get('/', Index)
router.get('/tutor', tutorsController.getAllTutors)
router.post('/tutor', tutorsController.createTutor)
router.put('/tutor/:id', tutorsController.updateTutor)
router.delete('/tutor/:id', tutorsController.deleteTutor)

// router.post('/pet/:tutorId', authMiddleware, petsController.createPet)
// router.put('/pet/:petId/tutor/:tutorId', authMiddleware, petsController.updatePet)
// router.delete('/pet/:petId/tutor/:tutorId', authMiddleware, petsController.deletePet)
