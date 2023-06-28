import express, { Request, Response } from "express";
import { tutorsController } from './controller/tutorsController';
import { petsController } from './controller/petController';

const tutorController = new tutorsController();
const petController = new petsController();
const app = express();
app.use(express.json());

// -- Home Page -- //
app.get("/", (req: Request, res: Response) => {
  res.send("Compass");
});

// -- Tutor routes -- //
app.get("/tutors", tutorController.getAll);
app.get('/tutors/:id', tutorController.getByID); // (Not requested)
app.post("/tutors", tutorController.createTutor);
app.put("/tutors/:id", tutorController.updateTutor);
app.delete("/tutors/:id", tutorController.deleteTutor);

// -- Pet routes -- //
app.post("/pet/:tutorId", petController.createPet);
app.put("/pet/:petId/tutor/:tutorId", petController.updatePet);
app.delete("/pet/:petId/tutor/:tutorId", petController.deletePet);

// -- Server -- //
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
