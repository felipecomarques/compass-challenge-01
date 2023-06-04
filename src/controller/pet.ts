import { Request, Response } from "express";
import tutors from "../data/dados.json";

// POST/pet/:tutor -> Creates a pet and adds it to.
export const createPet = (req: Request, res: Response) => {
  const tutorId = parseInt(req.params.tutorId, 10);
  const newPet = req.body;

  const tutor = tutors.find((tutor) => tutor.id === tutorId);

  if (tutor) {
    const newPetId = tutor.pets.length + 1;
    newPet.id = newPetId;
    tutor.pets.push(newPet);
    res.status(201).json(newPet);
  } else {
    res.status(404).json({ message: "Tutor not found" });
  }
};

// PUT/pet/:petId/tutor/:tutorId -> updates a pet's info.
export const updatePet = (req: Request, res: Response) => {
  const tutorId = parseInt(req.params.tutorId, 10);
  const petId = parseInt(req.params.petId, 10);
  const updatedPet = req.body;

  const tutor = tutors.find((tutor) => tutor.id === tutorId);

  if (tutor) {
    const pet = tutor.pets.find((pet) => pet.id === petId);
    if (pet) {
      Object.assign(pet, updatedPet);
      res.json(pet);
    } else res.status(404).json({ message: "Pet not found" });
  } else res.status(404).json({ message: "Tutor not found" });
};

// DELETE/pet/:petId/tutor/:tutorI -> deletes a pet from a tutor.
export const deletePet = (req: Request, res: Response) => {
  const tutorId = parseInt(req.params.tutorId, 10);
  const petId = parseInt(req.params.petId, 10);

  const tutor = tutors.find((tutor) => tutor.id === tutorId);

  if (tutor) {
    const petIndex = tutor.pets.findIndex((pet) => pet.id === petId);
    if (petIndex !== -1) {
      const deletedPet = tutor.pets.splice(petIndex, 1);
      res.json(deletedPet[0]);
    } else {
      res.status(404).json({ message: "Pet not found" });
    }
  } else {
    res.status(404).json({ message: "Tutor not found" });
  }
};
