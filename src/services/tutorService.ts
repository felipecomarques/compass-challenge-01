import tutorRepository  from "../repositories/tutorRepository";

class tutorService{
    async select(){
        return await new tutorRepository().getTutors();
    }

    async create(body: any){
        return await new tutorRepository().createTutor(body);
    }

    async update(id: number, body: any){
        return await new tutorRepository().updateTutor(id, body);
    }

    async delete(id: number){
        return await new tutorRepository().deleteTutor(id);
    }
}

export default tutorService;