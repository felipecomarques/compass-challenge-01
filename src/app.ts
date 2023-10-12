import express from 'express'
import { config } from 'dotenv'
import { routes } from '@config/routes/allRoutes'

config()
const app = express()
app.use(express.json())
app.use(routes)

export { app }
