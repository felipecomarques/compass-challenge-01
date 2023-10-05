import { prisma } from '@infra/prismaClient'
import { type Tutor } from '@prisma/client'

export class TutorRepository {
  async getAllTutors (): Promise<Tutor[]> {
    return await prisma.tutor.findMany({ include: { pets: true } })
  }

  async createTutor (tutorData: Tutor): Promise<Tutor> {
    const { name, password, phone, email, dateOfBirth, zipCode } = tutorData
    const newTutor = await prisma.tutor.create({
      data: {
        name,
        password,
        phone,
        email,
        dateOfBirth,
        zipCode
      }
    })
    return newTutor
  }

  async updateTutor (id: string, tutorData: Tutor): Promise<Tutor> {
    const { name, password, phone, email, dateOfBirth, zipCode } = tutorData
    const updatedTutor = await prisma.tutor.update({
      where: {
        id
      },
      data: {
        name,
        password,
        phone,
        email,
        dateOfBirth,
        zipCode
      }
    })
    return updatedTutor
  }

  async deleteTutor (id: string): Promise<Tutor> {
    const deletedTutor = await prisma.tutor.delete({ where: { id } })
    return deletedTutor
  }
}
