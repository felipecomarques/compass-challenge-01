import { Request, Response } from "express";
import tutorService from "../services/tutorService";

class tutorsController {
  private tutService: tutorService;

  constructor() {
    this.tutService = new tutorService();
  }

  // GET /tutors -> Retrieves all tutors.
  getTutor = async (req: Request, res: Response) => {
    const result = await this.tutService.select();
    res.status(201).json({result})
  }

  // POST/tutor -> Create a new tutor.
  createTutor = async (req: Request, res: Response) => {
    try {
      const result = await this.tutService.create(req.body);
      return res.status(200).json({ message: "Success", new_tutor: result});
    } catch (error) {
      return res.status(400).json({ message: "Failed"});
    }
  }
  
  // PUT/tutor/:id -> Updates a tutor.
  updateTutor = async (req: Request, res: Response) => {
    try {
      const idTutor = parseInt(req.params.id);
      const update = await this.tutService.update(idTutor, req.body)
      return res.status(200).json({ message: "Success", new_tutor: update});
    } catch (error) {
      return res.status(400).json({ message: "Failed"});
    }
  }

  // DELETE/tutor/:id -> Deletes a tutor.
  deleteTutor = async (req: Request, res: Response) => {
    try {
      const idTutor = parseInt(req.params.id);
      await this.tutService.delete(idTutor)
      return res.status(204).end(); // Não é pra retornar mensagem    
    } catch (error) {
      return res.status(400).json({ message: "Failed"});
    }
  }

  // POST/tutor -> Create a new tutor.
  // createTutor = (req: Request, res: Response) => {
  //   const newTutor = req.body;

  //   const { error, value } = tutorSchema.validate(newTutor);
  //   if (error) {
  //     res.status(400).json({ error: error.details[0].message });
  //     return;
  //   }

  //   const existingTutor = tutors.find((tutor) => tutor.id === newTutor.id);
  //   if (existingTutor) {
  //     res.status(409).json({ error: "Tutor with the same ID already exists" });
  //     return;
  //   }

  //   tutors.push(newTutor);
  //   res.status(201).json(newTutor);
  // };
  

  // PUT/tutor/:id -> Updates a tutor. (Opcional)
  // updateTutor = (req: Request, res: Response) => {
  //   const tutorId = parseInt(req.params.id, 10);
  //   const updatedTutor = req.body;
  //   const { error, value } = tutorSchema.validate(updatedTutor);

  //   if (error) {
  //     res.status(400).json({ error: error.details[0].message });
  //     return;
  //   }

  //   const tutorIndex = tutors.findIndex((tutor) => tutor.id === tutorId);

  //   if (tutorIndex !== -1) {
  //     tutors[tutorIndex] = updatedTutor;
  //     res.status(200).json(updatedTutor);
  //   } else {
  //     res.status(404).json({ message: "Tutor not found" });
  //   }
  // };

  // GET /tutors -> Retrieves all tutors.
  // getAll = (req: Request, res: Response) => {
  //   const showTutors = JSON.stringify(tutors, null, 2);
  //   res.setHeader("Content-Type", "application/json");
  //   res.send(showTutors);
  // };

  // // GET /tutors/:id -> Retrieves tutor by id. (Not requested)
  // getByID = (req: Request, res: Response) => {
  //   let index = Number(req.params.id);
  //   const showTutors = JSON.stringify(this.searchByDd(index), null, 2);
  //   res.setHeader("Content-Type", "application/json");
  //   res.send(showTutors);
  // };

  // // DELETE/tutor/:id -> Deletes a tutor.
  // deleteTutor = (req: Request, res: Response) => {
  //   const tutorId = parseInt(req.params.id, 10);
  //   const tutorIndex = tutors.findIndex((tutor) => tutor.id === tutorId);

  //   if (tutorIndex !== -1) {
  //     const deletedTutor = tutors.splice(tutorIndex, 1);
  //     res.json({ message: "Tutor deleted successfully", deletedTutor });
  //   } else {
  //     res.status(404).json({ message: "Tutor not found" });
  //   }
  // };

  // searchByDd(id: Number) {
  //   return tutors.filter((tutors) => tutors.id === id);
  // }
}

export default tutorsController;
