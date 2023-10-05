import { TutorRepository } from '@repositories/tutorRepository'
import { type Tutor } from '@prisma/client'

export class TutorService {
  async getAllTutors (): Promise<Tutor[]> {
    return new TutorRepository().getAllTutors()
  }

  async createTutor (tutorData: Tutor): Promise<Tutor> {
    return new TutorRepository().createTutor(tutorData)
  }

  async updateTutor (id: string, tutorData: Tutor): Promise<Tutor> {
    return new TutorRepository().updateTutor(id, tutorData)
  }

  async deleteTutor (id: string): Promise<Tutor> {
    return new TutorRepository().deleteTutor(id)
  }
}
