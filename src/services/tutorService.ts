import { TutorRepository } from '@repositories/tutorRepository'
import { TutorSchema } from '@services/schema/tutorSchema'
import { type Tutor } from '@prisma/client'

export class TutorService {
  async getAllTutors (): Promise<Tutor[]> {
    return await new TutorRepository().getAllTutors()
  }

  async createTutor (tutorData: Tutor): Promise<Tutor> {
    return await new TutorRepository().createTutor(TutorSchema.parse(tutorData))
  }

  async updateTutor (id: string, tutorData: Tutor): Promise<Tutor> {
    return await new TutorRepository().updateTutor(id, TutorSchema.parse(tutorData))
  }

  async deleteTutor (id: string): Promise<Tutor> {
    return await new TutorRepository().deleteTutor(id)
  }
}
