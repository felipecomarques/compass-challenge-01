import { Request, Response } from 'express';
import tutors from '../data/dados.json'; 

function searchByDd(id: Number){
    return tutors.filter( tutors => tutors.id === id);
};

function searchIndexByIdid (id: Number){
    return tutors.findIndex( tutors => tutors.id === id);
} ;

// GET /tutors -> Retrieves all tutors
export const getAll = (req: Request, res: Response) => {
    const showTutors = JSON.stringify(tutors, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(showTutors);
};

// GET /tutors/:id -> Retrieves tutor by id
export const getByID = (req: Request, res: Response) => {
    let index = Number(req.params.id);
    const showTutors = JSON.stringify(searchByDd(index), null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(showTutors);
};

// POST/tutor -> Create a new tutor.
export const createTutor = (req: Request, res: Response) => {
    const newTutor = req.body; 
    const newTutorId = tutors.length + 1;
    newTutor.id = newTutorId;
    tutors.push(newTutor);
    res.status(201).json(tutors);
};

// PUT/tutor/:id -> Updates a tutor. (Opcional)
export const updateTutor = (req: Request, res: Response) => {

};
// DELETE/tutor/:id -> Deletes a tutor.
export const deleteTutor = (req: Request, res: Response) => {
    
};