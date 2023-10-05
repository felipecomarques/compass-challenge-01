import { type Request, type Response } from 'express'
import { TutorService } from '@services/tutorService'

export class TutorsController {
  getAllTutors = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await new TutorService().getAllTutors()
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ message: 'Failed', error })
    }
  }

  createTutor = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await new TutorService().createTutor(req.body)
      res.status(201).json(result)
    } catch (error) {
      res.status(400).json({ message: 'Failed', error })
    }
  }

  updateTutor = async (req: Request, res: Response): Promise<void> => {
    try {
      const idTutor = req.params.id
      const result = await new TutorService().updateTutor(idTutor, req.body)
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ message: 'Failed', error })
    }
  }

  deleteTutor = async (req: Request, res: Response): Promise<void> => {
    try {
      const idTutor = req.params.id
      await new TutorService().deleteTutor(idTutor)
      res.status(204).end()
    } catch (error) {
      res.status(400).json({ message: 'Failed', error })
    }
  }
}
