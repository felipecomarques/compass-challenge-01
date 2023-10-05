import { PetRepository } from '@repositories/petRepository'
import { type Pet } from '@prisma/client'

export class PetService {
  async createPet (tutorId: string, petData: Pet): Promise<Pet | null> {
    return new PetRepository().createPet(tutorId, petData)
  }

  async updatePet (tutorIdParams: string, petIdParams: string, petData: Pet): Promise<Pet | null> {
    return new PetRepository().updatePet(tutorIdParams, petIdParams, petData)
  }

  async deletePet (tutorIdParams: string, petIdParams: string): Promise<Pet | null> {
    return new PetRepository().deletePet(tutorIdParams, petIdParams)
  }
}
