import { ITutor, TutorModel } from "../models/model";

class tutorRepository {
  async getTutors(): Promise<ITutor[]> {
    const get = await TutorModel.find();
    return get;
  }

  async createTutor(newTutor: ITutor): Promise<ITutor> {
    const newT = await TutorModel.create(newTutor);
    return newT;
  }

  async updateTutor(id: number, updatedTutor: ITutor): Promise<boolean> {
    const result = await TutorModel.updateOne({ id }, updatedTutor).exec();
    return result.modifiedCount > 0;
  }

  async deleteTutor(id: number): Promise<boolean> {
    const result = await TutorModel.deleteOne({ id }).exec();
    return result.deletedCount !== 0;
  }

  async hasPets(tutorId: number): Promise<boolean> {
    const tutor = await TutorModel.findOne({ id: tutorId }).exec();
    return Boolean(tutor && tutor.pets.length > 0);
  }
}

export default tutorRepository;