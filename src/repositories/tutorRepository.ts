import { ITutor } from "../models/model";
import { TutorModel } from "../models/model";

class TutorRepository {
    async getAllTutors(): Promise<ITutor[]> {
      return await TutorModel.find().exec();
    }
  
    async getTutorById(id: number): Promise<ITutor | null> {
      return await TutorModel.findOne({ id }).exec();
    }
  
    async createTutor(newTutor: ITutor): Promise<ITutor> {
      return await TutorModel.create(newTutor);
    }
  
    async updateTutor(id: number, updatedTutor: ITutor): Promise<boolean> {
      const result = await TutorModel.updateOne({ id }, updatedTutor).exec();
      return result.modifiedCount > 0;
    }
  
    async deleteTutor(id: number): Promise<boolean> {
      const result = await TutorModel.deleteOne({ id }).exec();
      return result.deletedCount !== 0;
    }
  }
  
  export { TutorRepository };