import express, { type Request, type Response } from 'express'
import { TutorRepository } from './repositories/tutorRepository'

const app = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.status(418).json('Hello! Welcome to the Veterinary Clinic API 🥰🌸')
})

app.get('/tutor', async (req: Request, res: Response) => {
  try {
    const result = await new TutorRepository().getAllTutors()
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ message: 'Failed', error })
  }
})

app.post('/tutor', async (req: Request, res: Response) => {
  try {
    const result = await new TutorRepository().createTutor(req.body)
    res.status(201).json(result)
  } catch (error) {
    res.status(400).json({ message: 'Failed', error })
  }
})

app.put('/tutor/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await new TutorRepository().updateTutor(id, req.body)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ message: 'Failed', error })
  }
})

app.delete('/tutor/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await new TutorRepository().deleteTutor(id)
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ message: 'Failed', error })
  }
})

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
