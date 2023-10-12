import { app } from './app'
import { info } from '@config/utils/logger'
const PORT = process.env.PORT ?? 5000

app.listen(PORT, () => {
  info(`Server is running on port ${PORT}`)
  info(`You can check the documentation at: http://localhost:${PORT}/api-docs/`)
})
