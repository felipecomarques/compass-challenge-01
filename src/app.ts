import express from 'express'
import { config } from 'dotenv'
import { routes } from '@config/routes/allRoutes'

config()
const app = express()
const PORT = process.env.PORT ?? 5000
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
