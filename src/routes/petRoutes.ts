import express from 'express';
import * as petController from "../controller/pet";

const router = express.Router();

router.post("/pet/:tutorId", petController.createPet);
router.put("/pet/:petId/tutor/:tutorId", petController.updatePet);
router.delete("/pet/:petId/tutor/:tutorId", petController.deletePet);

export default router;