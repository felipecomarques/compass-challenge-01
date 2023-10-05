import { PetRepository } from '@repositories/petRepository'
import { type Pet } from '@prisma/client'

export class PetService {
  async create (tutorId: string, petData: Pet): Promise<Pet | null> {
    return new PetRepository().createPet(tutorId, petData)
  }

  // async update (tutorId: number, petId: number, body: any) {
  //   return await new petRepository().updatePet(tutorId, petId, body)
  // }

  // async delete (tutorId: number, petId: number) {
  //   return await new petRepository().deletePet(tutorId, petId)
  // }
}
