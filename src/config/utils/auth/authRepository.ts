import { prisma } from '@config/database/prismaClient'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

export interface authRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token?: string
  error?: string
}

export class AuthRepository {
  async execute ({ email, password }: authRequest): Promise<AuthResponse> {
    try {
      const userExists = await prisma.tutor.findFirst({
        where: {
          email
        }
      })

      if (userExists == null) {
        return { error: 'User or password incorrect' }
      }

      const passwordMatch = await compare(password, userExists.password)
      if (!passwordMatch) {
        return { error: 'User or password incorrect' }
      }

      const token = sign({}, process.env.JWT_SECRET as string, {
        subject: userExists.id,
        expiresIn: '1h'
      })

      return { token }
    } catch (error) {
      return { error: 'An error occurred while processing your request' }
    }
  }
}
