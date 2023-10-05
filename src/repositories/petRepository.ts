import { prisma } from '@infra/prismaClient'
import { type Pet } from '@prisma/client'

export class PetRepository {
  async createPet (tutorIdParams: string, petData: Pet): Promise<Pet | null> {
    if (tutorIdParams == null || tutorIdParams === '') {
      return null
    }

    const { name, species, carry, weight, dateOfBirth, tutorId = tutorIdParams } = petData
    const newPet = await prisma.pet.create({
      data: {
        name,
        species,
        carry,
        weight,
        dateOfBirth,
        tutorId
      }
    })
    return newPet
  }

  async updatePet (tutorIdParams: string, petIdParams: string, petData: Pet): Promise<Pet | null> {
    if (tutorIdParams == null || tutorIdParams === '' || petIdParams == null || petIdParams === '') {
      return null
    }

    const { name, species, carry, weight, dateOfBirth, tutorId = tutorIdParams } = petData
    const updatedPet = await prisma.pet.update({
      where: {
        id: petIdParams
      },
      data: {
        name,
        species,
        carry,
        weight,
        dateOfBirth,
        tutorId
      }
    })
    return updatedPet
  }

  async deletePet (tutorIdParams: string, petIdParams: string): Promise<Pet | null> {
    if (tutorIdParams == null || tutorIdParams === '' || petIdParams == null || petIdParams === '') {
      return null
    }

    const deletedPet = await prisma.pet.delete({
      where: {
        id: petIdParams,
        tutorId: tutorIdParams
      }
    })
    return deletedPet
  }
}
