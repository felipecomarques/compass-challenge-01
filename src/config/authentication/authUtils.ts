import { type Request, type Response } from 'express'
import { CustomRequest } from './middleware'
import jwt from 'jsonwebtoken'

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are null' })
  }

  const id = new Date().getDate()
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET!)
  res.status(200).json({ access_token: token })
}

// Desconsiderar dashboard. Apenas para testar
// export const dashboard = async (req: CustomRequest, res: Response) => {
//   console.log(req.user);
//   const luckyNumber = Math.floor(Math.random() * 100);
//   res.status(200).json({
//     msg: `Hello, ${(<any>req.user).username}`,
//     secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
//   });
// };
