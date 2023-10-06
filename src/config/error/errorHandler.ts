import { type Response } from 'express'
import { Prisma } from '@prisma/client'

// res.status(400).json({ message: 'Failed', error })
export function handleError (res: Response, error: Error): void {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2014') {
      res.status(409).json({ error: 'Cannot delete due to dependencies' })
    } else if (error.code === 'P2002') {
      const failedField = error.meta?.target as string
      res.status(409).json({ error: `Duplicate ${failedField}` })
    } else {
      res.status(400).json({ error: 'Invalid request' })
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    res.status(422).json({ error: 'Validation error' })
  } else {
    res.status(500).json({ error: 'Internal server error' })
  }
}
