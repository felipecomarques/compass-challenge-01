import { IPet, TutorModel } from "../models/model";

class petRepository {
  async getPets(tutorId: number): Promise<IPet[]> {
    const tutor = await TutorModel.findOne({ id: tutorId });
    if (tutor) {
      return tutor.pets;
    } else {
      return [];
    }
  }

  async createPet(tutorId: number, newPet: IPet): Promise<IPet> {
    const tutor = await TutorModel.findOne({ id: tutorId }).exec();
    if (!tutor) {
      throw new Error("Tutor not found");
    }

    tutor.pets.push(newPet);
    await tutor.save();

    return newPet;
  }

  async updatePet(
    tutorId: number,
    petId: number,
    updatedPet: IPet
  ): Promise<boolean> {
    const tutor = await TutorModel.findOne({ id: tutorId }).exec();
    if (!tutor) {
      throw new Error("Tutor not found");
    }

    const pet = tutor.pets.find((pet) => pet.id === petId);
    if (!pet) {
      throw new Error("Pet not found");
    }

    Object.assign(pet, updatedPet);
    await tutor.save();

    return true;
  }

  async deletePet(tutorId: number, petId: number): Promise<boolean> {
    const tutor = await TutorModel.findOne({ id: tutorId }).exec();
    if (!tutor) {
      throw new Error("Tutor not found");
    }

    const petIndex = tutor.pets.findIndex((pet) => pet.id === petId);
    if (petIndex === -1) {
      throw new Error("Pet not found");
    }

    tutor.pets.splice(petIndex, 1);
    await tutor.save();

    return true;
  }
}

export default petRepository;
