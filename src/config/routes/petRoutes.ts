import { Router } from 'express'
import { PetController } from '@controller/petController'
import { authMiddleware } from '@config/middleware/ensureAuth'

export const petRoutes = Router()
const petController = new PetController()

petRoutes.post('/pet/:tutorId', authMiddleware, petController.createPet)
petRoutes.put('/pet/:petId/tutor/:tutorId', authMiddleware, petController.updatePet)
petRoutes.delete('/pet/:petId/tutor/:tutorId', authMiddleware, petController.deletePet)
