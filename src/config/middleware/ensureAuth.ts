import { type Request, type Response, type NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export function authMiddleware (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined {
  const authToken = req.headers.authorization

  if (authToken == null) {
    return res.status(401).json({ error: 'Token is missing' })
  }

  const [, token] = authToken.split(' ')

  try {
    verify(token, process.env.JWT_SECRET as string)
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}
