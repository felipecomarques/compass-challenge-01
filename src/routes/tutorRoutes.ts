import express from 'express';
import * as tutorController from "../controller/tutors";

const router = express.Router();

router.get("/tutors", tutorController.getAll);
// router.get('/tutors/:id', tutorController.getByID); (Not requested)
router.post("/tutors", tutorController.createTutor);
router.put("/tutors/:id", tutorController.updateTutor);
router.delete("/tutors/:id", tutorController.deleteTutor);

export default router;