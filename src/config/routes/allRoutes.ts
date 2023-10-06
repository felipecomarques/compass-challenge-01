import { Router } from 'express'
import { Index } from '@controller/indexController'
import { AuthController } from '@controller/authController'
import { tutorRoutes } from './tutorRoutes'
import { petRoutes } from './petRoutes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '@config/doc/swagger.json'

export const routes = Router()

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
routes.get('/', Index)
routes.post('/auth', AuthController)
routes.use(tutorRoutes)
routes.use(petRoutes)
