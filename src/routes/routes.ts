import express from 'express';
import tutorController from "../controller/tutorsController";
import { petsController } from '../controller/petController';

const router = express.Router();

const tutorC = new tutorController;
router.get("/tutors", tutorC.getTutor);
//router.get('/tutors/:id', tutorController.getByID); (Not requested)
router.post("/tutors", tutorC.createTutor);
router.put("/tutors/:id", tutorC.updateTutor);
router.delete("/tutors/:id", tutorC.deleteTutor);

const petC = new petsController
router.post("/pet/:tutorId", petC.createPet);
router.put("/pet/:petId/tutor/:tutorId", petC.updatePet);
router.delete("/pet/:petId/tutor/:tutorId", petC.deletePet);
export default router;