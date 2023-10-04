import express, { type Request, type Response } from 'express'
import { Hello } from '@controller/testController'
import { prisma } from 'src/infrastructure/prismaClient'
import { TutorRepository, getTutors } from './repositories/tutorRepository'

import { type TutorModel } from './repositories/models/tutorModel'
import { Prisma, type PrismaPromise } from '@prisma/client'

const app = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  Hello('test')
  res.send('Compass')
})

const tutorRepository = new TutorRepository()

app.get('/tutor', async (req: Request, res: Response) => {
  try {
    const tutors = await getTutors()
    res.status(200).json(tutors)
  } catch (error) {
    res.status(400).json({ message: 'Failed', error })
  }
})

app.post('/tutor', async (req: Request, res: Response) => {
  try {
    const result = await tutorRepository.createTutor(req.body)
    console.log(result)
    return res.status(201).json(result)
  } catch (error) {
    return res.status(400).json({ message: 'Failed', error })
  }
})

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
