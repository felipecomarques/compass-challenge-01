import { type Request, type Response } from 'express'
import { PetService } from '@services/petService'

export class PetController {
  createPet = async (req: Request, res: Response): Promise<void> => {
    try {
      const idTutor = req.params.tutorId
      const result = await new PetService().createPet(idTutor, req.body)
      res.status(201).json(result)
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  updatePet = async (req: Request, res: Response): Promise<void> => {
    try {
      const tutorId = req.params.tutorId
      const petId = req.params.petId
      const result = await new PetService().updatePet(tutorId, petId, req.body)
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  deletePet = async (req: Request, res: Response): Promise<void> => {
    try {
      const tutorId = req.params.tutorId
      const petId = req.params.petId
      const result = await new PetService().deletePet(tutorId, petId)
      res.status(204).json(result)
    } catch (error) {
      res.status(404).json({ error })
    }
  }
}
