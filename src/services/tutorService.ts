import tutorRepository from "../repositories/tutorRepository";

class tutorService {
  async select() {
    return await new tutorRepository().getTutors();
  }

  async create(body: any) {
    const tutors = await new tutorRepository().getTutors();
    const lastTutor = tutors.length > 0 ? tutors[tutors.length - 1] : null;
    const newId = lastTutor ? lastTutor.id + 1 : 1;
    body.id = newId;
    return await new tutorRepository().createTutor(body);
  }

  async update(id: number, body: any) {
    return await new tutorRepository().updateTutor(id, body);
  }

  async delete(id: number) {
    const hasPets = await new tutorRepository().hasPets(id);
    if (hasPets) {
      throw new Error("Cannot delete tutor with associated pets");
    }
    return await new tutorRepository().deleteTutor(id);
  }
}

export default tutorService;
