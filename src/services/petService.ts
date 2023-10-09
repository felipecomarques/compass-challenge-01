import { PetRepository, type PatchPet } from '@repositories/petRepository'
import { TutorRepository } from '@repositories/tutorRepository'
import { PetSchema, PetPatch } from './schema/petSchema'
import { z } from 'zod'
import { type Pet } from '@prisma/client'

export class PetService {
  async createPet (tutorIdParams: string, petData: Pet): Promise<Pet | null> {
    await new TutorRepository().findTutor(tutorIdParams)
    const bodyAndId = PetSchema.extend({ tutorId: z.string().default(tutorIdParams) })
    return await new PetRepository().createPet(tutorIdParams, bodyAndId.parse(petData))
  }

  async updatePet (tutorIdParams: string, petIdParams: string, petData: Pet): Promise<Pet | null> {
    await new TutorRepository().findTutor(tutorIdParams)
    const bodyAndId = PetSchema.extend({ tutorId: z.string().default(tutorIdParams) })
    return await new PetRepository().updatePet(tutorIdParams, petIdParams, bodyAndId.parse(petData))
  }

  async patchPet (tutorIdParams: string, petIdParams: string, petData: PatchPet): Promise<Pet | null> {
    await new TutorRepository().findTutor(tutorIdParams)
    return await new PetRepository().patchPet(tutorIdParams, petIdParams, PetPatch.parse(petData))
  }

  async deletePet (tutorIdParams: string, petIdParams: string): Promise<Pet | null> {
    return await new PetRepository().deletePet(tutorIdParams, petIdParams)
  }
}
