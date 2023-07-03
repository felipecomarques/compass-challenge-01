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
      res.status(400).json({ error: error });
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
        res
          .status(200)
          .json({ updated_info: petData });
      } else {
        res.status(404).json({ message: "Pet not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error });
    }
  };

  // DELETE/pet/:petId/tutor/:tutorI -> deletes a pet from a tutor. (AUTH REQUIRED!)
  deletePet = async (req: Request, res: Response) => {
    try {
      const tutorId = parseInt(req.params.tutorId, 10);
      const petId = parseInt(req.params.petId, 10);

      const deleted = await this.petService.delete(tutorId, petId);
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Pet not found" });
      }
    } catch (error) {
      res.status(404).json({ error: error });
    }
  };
}

export default new petsController();
