import { TutorRepository } from '@repositories/tutorRepository'
import { type Tutor } from '@prisma/client'

export class TutorService {
  async getAllTutors (): Promise<Tutor[]> {
    return await new TutorRepository().getAllTutors()
  }

  async createTutor (tutorData: Tutor): Promise<Tutor> {
    return await new TutorRepository().createTutor(tutorData)
  }

  async updateTutor (id: string, tutorData: Tutor): Promise<Tutor> {
    return await new TutorRepository().updateTutor(id, tutorData)
  }

  async deleteTutor (id: string): Promise<Tutor> {
    return await new TutorRepository().deleteTutor(id)
  }
}
