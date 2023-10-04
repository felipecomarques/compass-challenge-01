import express, { type Request, type Response } from 'express'
import { Hello } from '@controller/testController'

const app = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  Hello('test')
  res.send('Compass')
})

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
