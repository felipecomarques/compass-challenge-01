import { AuthRepository } from '@repositories/authRepository'
import { type Request, type Response } from 'express'

export const AuthController = async (req: Request, res: Response):
Promise<Response<any, Record<string, any>>> => {
  const { email, password } = req.body
  const result = await new AuthRepository().execute({
    email,
    password
  })

  if (result.error !== undefined) {
    return res.status(400).json(result)
  }

  return res.json(result)
}
