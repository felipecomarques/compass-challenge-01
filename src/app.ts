import express from 'express'
import { config } from 'dotenv'
import { routes } from '@config/routes/allRoutes'
import { info } from '@config/utils/logger'

config()
const app = express()
const PORT = process.env.PORT ?? 5000
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  info(`Server is running on port ${PORT}`)
  info(`You can check the documentation at: http://localhost:${PORT}/api-docs/`)
})
