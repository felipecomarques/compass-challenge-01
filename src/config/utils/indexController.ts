import { type Request, type Response } from 'express'

export const Index = async (req: Request, res: Response): Promise<void> => {
  res.status(418).json({
    message: 'Hello! Welcome to the Veterinary Clinic API 🥰🌸',
    documentation: `You can check the documentation in the http://localhost:${process.env.PORT ?? 5000}/api-docs/ route`
  })
}
