import express, { Request, Response } from 'express';
import tutors from './data';

const app = express();
app.use(express.json());

// GET /tutors -> Retrieves all tutors
app.get('/tutors', (req: Request, res: Response) => {
    const showTutors = JSON.stringify(tutors, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(showTutors);
});

// POST/tutor -> Create a new tutor.
app.post('/tutor', (req: Request, res: Response) => {
    const newTutor = req.body; 
    const newTutorId = tutors.length + 1;
    newTutor.id = newTutorId;
    tutors.push(newTutor);
  
    res.status(201).json(tutors);
});

// PUT/tutor/:id -> Updates a tutor. (Opcional)

// DELETE/tutor/:id -> Deletes a tutor.

// POST/pet/:tutor -> > Creates a pet and adds it to.

// PUT/pet/:petId/tutor/:tutorId -> updates a pet's info.

// DELETE/pet/:petId/tutor/:tutorI -> deletes a pet from a tutor.

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
