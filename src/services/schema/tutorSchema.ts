import { z } from 'zod'

export const TutorSchema = z.object({
  id: z.string().default(''),
  name: z.string().min(3),
  password: z.string(),
  phone: z.string().min(8).max(11),
  email: z.string().email(),
  dateOfBirth: z.coerce.date(),
  zipCode: z.string()
})

export const TutorPatch = z.object({
  name: z.string().min(3).optional(),
  password: z.string().optional(),
  phone: z.string().min(8).max(11).optional(),
  email: z.string().email().optional(),
  dateOfBirth: z.coerce.date().optional(),
  zipCode: z.string().optional()
})
