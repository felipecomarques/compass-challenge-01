// USER: felipecomarques
// PASS: EjRFjJ7ketXkaO6P
// mongodb+srv://felipecomarques:EjRFjJ7ketXkaO6P@nodeprojects.maotnrz.mongodb.net/

import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { tutorsController } from "./controller/tutorsController";
import { petsController } from "./controller/petController";
import { TutorRepository } from "./repositories/tutorRepository";
import { connectDB } from "./data/database";

const tutorController = new tutorsController();
const petController = new petsController();
const tR = new TutorRepository();
const app = express();
app.use(express.json());


// -- Home Page -- //
app.get("/", (req: Request, res: Response) => {
  res.send("Compass");
});

// -- Tutor routes -- //
//app.get("/tutors", tut.getAllTutors);
app.get("/tutors/:id", tutorController.getByID); // (Not requested)
app.post("/tutors", tutorController.createTutor);
//app.put("/tutors/:id", tutorController.updateTutor);
app.delete("/tutors/:id", tutorController.deleteTutor);

// -- Pet routes -- //
app.post("/pet/:tutorId", petController.createPet);
app.put("/pet/:petId/tutor/:tutorId", petController.updatePet);
app.delete("/pet/:petId/tutor/:tutorId", petController.deletePet);


// -- Start -- //
connectDB(process.env.MONGO_URI!)
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar com o banco de dados:", error);
    process.exit(1);
  });
