import jwt, { type JwtPayload } from 'jsonwebtoken'
import { type Request, type Response, type NextFunction } from 'express'

// https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request
export interface CustomRequest extends Request {
  user?: JwtPayload
}

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }
  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      res.status(401).json({ message: 'Invalid token' })
      return
    }
    req.user = decoded
    next()
  })
}
