import { type Response } from 'express'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'

// res.status(400).json({ message: 'Failed', error })
export function handleError (res: Response, error: unknown): void {
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
  } else if (error instanceof ZodError) {
    const validationErrors: Record<string, string[]> = {}

    error.issues.forEach((issue) => {
      const field = issue.path[0]

      if (!(field in validationErrors)) {
        validationErrors[field] = []
      }

      const errorMessage = issue.message
      validationErrors[field].push(errorMessage)
    })

    const formattedErrors = {
      error: 'Validation error',
      fields: validationErrors
    }

    res.status(400).json(formattedErrors)
  } else {
    res.status(500).json({ error: 'Internal server error', msg: error })
  }
}
