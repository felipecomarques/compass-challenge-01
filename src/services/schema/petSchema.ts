import { z } from 'zod'

export const PetSchema = z.object({
  id: z.string().default(''),
  name: z.string().min(3),
  species: z.string(),
  carry: z.string().max(2),
  weight: z.number(),
  dateOfBirth: z.coerce.date()
})

export const PetPatch = z.object({
  id: z.string().default('').optional(),
  name: z.string().min(3).optional(),
  species: z.string().optional(),
  carry: z.string().max(2).optional(),
  weight: z.number().optional(),
  dateOfBirth: z.coerce.date().optional()
})
