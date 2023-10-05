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

  // async updatePet (
  //   tutorId: number,
  //   petId: number,
  //   updatedPet: IPet
  // ): Promise<boolean> {
  //   const tutor = await TutorModel.findOne({ id: tutorId }).exec()
  //   if (!tutor) {
  //     throw new Error('Tutor not found')
  //   }

  //   const pet = tutor.pets.find((pet) => pet.id === petId)
  //   if (!pet) {
  //     throw new Error('Pet not found')
  //   }

  //   Object.assign(pet, updatedPet)
  //   await tutor.save()

  //   return true
  // }

  // async deletePet (tutorId: number, petId: number): Promise<boolean> {
  //   const tutor = await TutorModel.findOne({ id: tutorId }).exec()
  //   if (!tutor) {
  //     throw new Error('Tutor not found')
  //   }

  //   const petIndex = tutor.pets.findIndex((pet) => pet.id === petId)
  //   if (petIndex === -1) {
  //     throw new Error('Pet not found')
  //   }

  //   tutor.pets.splice(petIndex, 1)
  //   await tutor.save()

  //   return true
  // }
}
