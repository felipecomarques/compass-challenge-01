import { type TutorModel } from './models/tutorModel'
import { prisma } from 'src/infrastructure/prismaClient'

export async function getTutors (): Promise<TutorModel[]> {
  return await prisma.tutor.findMany()
}
export class TutorRepository {
  // async getTutors (): Promise<TutorModel[]> {
  //   return await prisma.tutor.findMany()
  // }

  async createTutor (tutorData: TutorModel): Promise<TutorModel> {
    const { name, phone, email, dateOfBirth, zipCode } = tutorData
    const newTutor = await prisma.tutor.create({
      data: {
        name,
        phone,
        email,
        dateOfBirth,
        zipCode
      }
    })

    return newTutor
  }

  // async updateTutor (id: number, updatedTutor: ITutor): Promise<ITutor> {
  //   const result = await TutorModel.updateOne({ id }, updatedTutor).exec()
  //   // return result.modifiedCount > 0;
  //   return updatedTutor
  // }

  // async deleteTutor (id: number): Promise<boolean> {
  //   const result = await TutorModel.deleteOne({ id }).exec()
  //   return result.deletedCount !== 0
  // }

  // async hasPets (tutorId: number): Promise<boolean> {
  //   const tutor = await TutorModel.findOne({ id: tutorId }).exec()
  //   return Boolean(tutor && tutor.pets.length > 0)
  // }
}
