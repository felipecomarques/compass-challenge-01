import { Request, Response } from "express";
import tutors from "../repositories/dados.json"; // AQUI ERA O ARQUIVO ANTIGO
import tutorSchema from "../services/tutorService";

class tutorsController {
  // GET /tutors -> Retrieves all tutors.
  getAll = (req: Request, res: Response) => {
    const showTutors = JSON.stringify(tutors, null, 2);
    res.setHeader("Content-Type", "application/json");
    res.send(showTutors);
  };

  // GET /tutors/:id -> Retrieves tutor by id. (Not requested)
  getByID = (req: Request, res: Response) => {
    let index = Number(req.params.id);
    const showTutors = JSON.stringify(this.searchByDd(index), null, 2);
    res.setHeader("Content-Type", "application/json");
    res.send(showTutors);
  };

  // POST/tutor -> Create a new tutor.
  createTutor = (req: Request, res: Response) => {
    const newTutor = req.body;

    const { error, value } = tutorSchema.validate(newTutor);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const existingTutor = tutors.find((tutor) => tutor.id === newTutor.id);
    if (existingTutor) {
      res.status(409).json({ error: "Tutor with the same ID already exists" });
      return;
    }

    tutors.push(newTutor);
    res.status(201).json(newTutor);
  };

  // PUT/tutor/:id -> Updates a tutor. (Opcional)
  updateTutor = (req: Request, res: Response) => {
    const tutorId = parseInt(req.params.id, 10);
    const updatedTutor = req.body;
    const { error, value } = tutorSchema.validate(updatedTutor);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const tutorIndex = tutors.findIndex((tutor) => tutor.id === tutorId);

    if (tutorIndex !== -1) {
      tutors[tutorIndex] = updatedTutor;
      res.status(200).json(updatedTutor);
    } else {
      res.status(404).json({ message: "Tutor not found" });
    }
  };

  // DELETE/tutor/:id -> Deletes a tutor.
  deleteTutor = (req: Request, res: Response) => {
    const tutorId = parseInt(req.params.id, 10);
    const tutorIndex = tutors.findIndex((tutor) => tutor.id === tutorId);

    if (tutorIndex !== -1) {
      const deletedTutor = tutors.splice(tutorIndex, 1);
      res.json({ message: "Tutor deleted successfully", deletedTutor });
    } else {
      res.status(404).json({ message: "Tutor not found" });
    }
  };

  searchByDd(id: Number) {
    return tutors.filter((tutors) => tutors.id === id);
  }
}

export { tutorsController };
