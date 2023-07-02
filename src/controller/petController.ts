import { Request, Response } from "express";
import petService from "../services/petService";

class petsController {
  private petService: petService;

  constructor() {
    this.petService = new petService();
  }

  // POST/pet/:tutor -> Creates a pet and adds it to. (AUTH REQUIRED!)
  createPet = async (req: Request, res: Response) => {
    try {
      const idTutor = parseInt(req.params.tutorId);
      const newPet = req.body;

      const pet = await this.petService.create(idTutor, newPet);
      res.status(201).json(pet);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  // PUT/pet/:petId/tutor/:tutorId -> updates a pet's info. (AUTH REQUIRED!)
  updatePet = async (req: Request, res: Response) => {
    try {
      const tutorId = parseInt(req.params.tutorId, 10);
      const petId = parseInt(req.params.petId, 10);
      const petData = req.body;

      const updatedPet = await this.petService.update(tutorId, petId, petData);
      if (updatedPet) {
        res.status(200).json({ message: "Pet updated successfully", updated_pet: petData});
      } else {
        res.status(404).json({ message: "Pet not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  // DELETE/pet/:petId/tutor/:tutorI -> deletes a pet from a tutor. (AUTH REQUIRED!)
  deletePet = async (req: Request, res: Response) => {
    try {
      const tutorId = parseInt(req.params.tutorId, 10);
      const petId = parseInt(req.params.petId, 10);

      const deleted = await this.petService.delete(tutorId, petId);
      if (deleted) {
        res.status(200).json({ message: 'Pet deleted successfully' });
      } else {
        res.status(404).json({ message: 'Pet not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  
  // // POST/pet/:tutor -> Creates a pet and adds it to.
  // createPet = (req: Request, res: Response) => {
  //   const tutorId = parseInt(req.params.tutorId, 10);
  //   const newPet = req.body;

  //   const { error, value } = petSchema.validate(newPet);
  //   if (error) {
  //     res.status(400).json({ error: error.details[0].message });
  //     return;
  //   }

  //   const tutor = tutors.find((tutor) => tutor.id === tutorId);
  //   if (tutor) {
  //     const existingPetsIds = tutor.pets.map((pet) => pet.id);
  //     const hasDuplicateId = existingPetsIds.some((id) => id === newPet.id);

  //     if (hasDuplicateId) {
  //       res.status(400).json({ error: "Pet ID must be unique" });
  //       return;
  //     }
  //     tutor.pets.push(newPet);
  //     res.status(201).json(newPet);
  //   } else {
  //     res.status(404).json({ message: "Tutor not found" });
  //   }
  // };

  // // PUT/pet/:petId/tutor/:tutorId -> updates a pet's info.
  // updatePet = (req: Request, res: Response) => {
  //   const tutorId = parseInt(req.params.tutorId, 10);
  //   const petId = parseInt(req.params.petId, 10);
  //   const updatedPet = req.body;

  //   const { error, value } = petSchema.validate(updatedPet);
  //   if (error) {
  //     res.status(400).json({ error: error.details[0].message });
  //     return;
  //   }

  //   const tutor = tutors.find((tutor) => tutor.id === tutorId);

  //   if (tutor) {
  //     const petIndex = tutor.pets.findIndex((pet) => pet.id === petId);
  //     if (petIndex !== -1) {
  //       const existingPetsIds = tutor.pets.map((pet) => pet.id);
  //       const hasDuplicateId = existingPetsIds.some(
  //         (id) => id === updatedPet.id && id !== petId
  //       );

  //       if (hasDuplicateId) {
  //         res.status(400).json({ error: "Pet ID must be unique" });
  //         return;
  //       }

  //       tutor.pets[petIndex] = { ...tutor.pets[petIndex], ...updatedPet };
  //       res.json(tutor.pets[petIndex]);
  //     } else {
  //       res.status(404).json({ message: "Pet not found" });
  //     }
  //   } else {
  //     res.status(404).json({ message: "Tutor not found" });
  //   }
  // };

  // // DELETE/pet/:petId/tutor/:tutorI -> deletes a pet from a tutor.
  // deletePet = (req: Request, res: Response) => {
  //   const tutorId = parseInt(req.params.tutorId, 10);
  //   const petId = parseInt(req.params.petId, 10);

  //   const tutor = tutors.find((tutor) => tutor.id === tutorId);

  //   if (tutor) {
  //     const petIndex = tutor.pets.findIndex((pet) => pet.id === petId);
  //     if (petIndex !== -1) {
  //       const deletedPet = tutor.pets.splice(petIndex, 1);
  //       res.json(deletedPet[0]);
  //     } else {
  //       res.status(404).json({ message: "Pet not found" });
  //     }
  //   } else {
  //     res.status(404).json({ message: "Tutor not found" });
  //   }
  // };
}

export { petsController };
