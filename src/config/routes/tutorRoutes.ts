import { Router } from 'express'
import { TutorsController } from '@controller/tutorsController'
import { authMiddleware } from '@config/utils/auth/middleware/ensureAuth'

export const tutorRoutes = Router()
const tutorsController = new TutorsController()

tutorRoutes.get('/tutor', authMiddleware, tutorsController.getAllTutors)
tutorRoutes.post('/tutor', tutorsController.createTutor)
tutorRoutes.patch('/tutor/:id', authMiddleware, tutorsController.patchTutor)
tutorRoutes.put('/tutor/:id', authMiddleware, tutorsController.updateTutor)
tutorRoutes.delete('/tutor/:id', authMiddleware, tutorsController.deleteTutor)
