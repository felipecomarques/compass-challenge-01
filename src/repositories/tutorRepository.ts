import { prisma } from '@config/database/prismaClient'
import { type Tutor } from '@prisma/client'
import bcrypt from 'bcrypt'

export class TutorRepository {
  async getAllTutors (): Promise<Tutor[]> {
    return await prisma.tutor.findMany({
      include: {
        pets: {
          select: {
            id: true,
            name: true,
            species: true,
            carry: true,
            weight: true,
            dateOfBirth: true,
            tutorId: false
          }
        }
      }
    })
  }

  async findTutor (id: string): Promise<Tutor> {
    return await prisma.tutor.findUniqueOrThrow({ where: { id } })
  }

  async createTutor (tutorData: Tutor): Promise<Tutor> {
    const { name, password, phone, email, dateOfBirth, zipCode } = tutorData

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newTutor = await prisma.tutor.create({
      data: {
        name,
        password: hashedPassword,
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

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const updatedTutor = await prisma.tutor.update({
      where: {
        id
      },
      data: {
        name,
        password: hashedPassword,
        phone,
        email,
        dateOfBirth,
        zipCode
      }
    })
    return updatedTutor
  }

  async patchTutor (id: string, tutorData: PatchTutor): Promise<Tutor | null> {
    if (tutorData.password != null) {
      const salt = await bcrypt.genSalt(10)
      tutorData.password = await bcrypt.hash(tutorData.password, salt)
    }

    const updatedTutor = await prisma.tutor.update({
      where: { id },
      data: tutorData
    })
    return updatedTutor
  }

  async deleteTutor (id: string): Promise<Tutor> {
    const deletedTutor = await prisma.tutor.delete({ where: { id } })
    return deletedTutor
  }
}

export interface PatchTutor {
  name?: string
  password?: string
  phone?: string
  email?: string
  dateOfBirth?: Date
  zipCode?: string
}
