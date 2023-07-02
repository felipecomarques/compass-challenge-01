import petRepository from "../repositories/petRepository";

class petService{
    async create(tutorId: number, body: any){
        return await new petRepository().createPet(tutorId, body);
    }

    async update(tutorId: number, petId: number, body: any){
        return await new petRepository().updatePet(tutorId, petId, body);
    }

    async delete(tutorId: number, petId: number){
        return await new petRepository().deletePet(tutorId, petId);
    }
}

export default petService;