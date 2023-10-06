import { Router } from 'express'
import { TutorsController } from '@controller/tutorsController'

export const tutorRoutes = Router()
const tutorsController = new TutorsController()

tutorRoutes.get('/tutor', tutorsController.getAllTutors)
tutorRoutes.post('/tutor', tutorsController.createTutor)
tutorRoutes.put('/tutor/:id', tutorsController.updateTutor)
tutorRoutes.delete('/tutor/:id', tutorsController.deleteTutor)
