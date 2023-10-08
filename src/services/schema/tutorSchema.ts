import { z } from 'zod'

export const TutorSchema = z.object({
  id: z.string().default('0'),
  name: z.string().min(3),
  password: z.string(),
  phone: z.string(),
  email: z.string().email(),
  dateOfBirth: z.coerce.date(),
  zipCode: z.string()
})
