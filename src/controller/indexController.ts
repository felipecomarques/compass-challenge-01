import { type Request, type Response } from 'express'

export const Index = async (req: Request, res: Response): Promise<void> => {
  res.status(418).json('Hello! Welcome to the Veterinary Clinic API 🥰🌸')
}
