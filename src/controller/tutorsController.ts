import { Request, Response } from "express";
import tutorService from "../services/tutorService";

class tutorsController {
  private tutService: tutorService;

  constructor() {
    this.tutService = new tutorService();
  }

  // GET /tutors -> Retrieves all tutors. (AUTH REQUIRED!)
  getTutor = async (req: Request, res: Response) => {
    const result = await this.tutService.select();
    res.status(201).json(result);
  };

  // POST/tutor -> Create a new tutor.
  createTutor = async (req: Request, res: Response) => {
    try {
      const result = await this.tutService.create(req.body);
      return res.status(200).json({ message: "Success", new_tutor: result });
    } catch (error) {
      return res.status(400).json({ message: "Failed" });
    }
  };

  // PUT/tutor/:id -> Updates a tutor. (AUTH REQUIRED!)
  updateTutor = async (req: Request, res: Response) => {
    try {
      const idTutor = parseInt(req.params.id);
      const update = await this.tutService.update(idTutor, req.body);
      return res
        .status(200)
        .json({ message: "Success", updated_tutor: update });
    } catch (error) {
      return res.status(400).json({ message: "Failed" });
    }
  };

  // DELETE/tutor/:id -> Deletes a tutor. (AUTH REQUIRED!)
  deleteTutor = async (req: Request, res: Response) => {
    try {
      const idTutor = parseInt(req.params.id);
      await this.tutService.delete(idTutor);
      return res.status(204).end(); // Não é pra retornar mensagem
    } catch (error) {
      return res.status(400).json({ message: "Failed" });
    }
  };
}

export default new tutorsController();
