import express from "express";
import { login } from "../auth/authUtils";
import { authMiddleware } from "../auth/middleware";
import tutorsController from "../controller/tutorsController";
import petsController from "../controller/petController";

const router = express.Router();

router.post("/auth", login);

router.get("/tutors", authMiddleware, tutorsController.getTutor);
router.post("/tutors", tutorsController.createTutor);
router.put("/tutors/:id", authMiddleware, tutorsController.updateTutor);
router.delete("/tutors/:id", authMiddleware, tutorsController.deleteTutor);

router.post("/pet/:tutorId", authMiddleware, petsController.createPet);
router.put("/pet/:petId/tutor/:tutorId", authMiddleware, petsController.updatePet);
router.delete("/pet/:petId/tutor/:tutorId", authMiddleware, petsController.deletePet);

export default router;
