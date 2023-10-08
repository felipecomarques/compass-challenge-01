import { z } from 'zod'

export const PetSchema = z.object({
  id: z.string().default(''),
  name: z.string().min(3),
  species: z.string(),
  carry: z.string().max(2),
  weight: z.number(),
  dateOfBirth: z.coerce.date()
})
