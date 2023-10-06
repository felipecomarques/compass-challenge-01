import { Router } from 'express'
import { PetController } from '@controller/petController'

export const petRoutes = Router()
const petController = new PetController()

petRoutes.post('/pet/:tutorId', petController.createPet)
petRoutes.put('/pet/:petId/tutor/:tutorId', petController.updatePet)
petRoutes.delete('/pet/:petId/tutor/:tutorId', petController.deletePet)
