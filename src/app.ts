import express, { Request, Response } from "express";
import * as tutorController from "./controller/tutors";
import * as petController from "./controller/pet";

const app = express();
app.use(express.json());

// -- Home Page -- //
app.get("/", (req: Request, res: Response) => {
  res.send("Compass");
});

// -- Tutors Route -- //
app.get("/tutors", tutorController.getAll);
//app.get('/tutors/:id', tutorController.getByID);
app.post("/tutors", tutorController.createTutor);
app.put("/tutors/:id", tutorController.updateTutor);
app.delete("/tutors/:id", tutorController.deleteTutor);

// -- Pet Route -- //
app.post("/pet/:tutorId", petController.createPet);
app.put("/pet/:petId/tutor/:tutorId", petController.updatePet);
app.delete("/pet/:petId/tutor/:tutorId", petController.deletePet);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
