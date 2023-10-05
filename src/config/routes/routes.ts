import { Router } from 'express'
import { Index } from '@config/index'
import { TutorsController } from '@controller/tutorsController'
import { PetController } from '@controller/petController'
// import { login } from "../auth/authUtils";
// import { authMiddleware } from '../auth/middleware'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '@config/doc/swagger.json'

export const router = Router()
const tutorsController = new TutorsController()
const petController = new PetController()

router.get('/', Index)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
router.get('/tutor', tutorsController.getAllTutors)
router.post('/tutor', tutorsController.createTutor)
router.put('/tutor/:id', tutorsController.updateTutor)
router.delete('/tutor/:id', tutorsController.deleteTutor)
router.post('/pet/:tutorId', petController.createPet)
router.put('/pet/:petId/tutor/:tutorId', petController.updatePet)
router.delete('/pet/:petId/tutor/:tutorId', petController.deletePet)
