import { ITutor } from "../models/model";
import { TutorModel } from "../models/model";
import Joi from 'joi';

// const tutorSchema = Joi.object({
//   name: Joi.string().required(),
//   phone: Joi.string().required(),
//   email: Joi.string().email().required(),
//   date_of_birth: Joi.date().required(),
//   zip_code: Joi.string().required(),
//   pets: Joi.array().items(
//     Joi.object({
//       name: Joi.string().required(),
//       species: Joi.string().required(),
//       carry: Joi.string().required(),
//       weight: Joi.number().required(),
//       date_of_birth: Joi.date().required(),
//     })
//   ),
// });

// class TutorService {
//   async createTutor(tutorData: ITutor): Promise<ITutor> {
//     // Gerar um ID autoincremental
//     const tutorCount = await TutorModel.countDocuments().exec();
//     const newTutor = { id: tutorCount + 1, ...tutorData };

//     // Verificar os dados com Joi
//     const { error, value } = tutorSchema.validate(newTutor);
//     if (error) {
//       throw new Error(error.details[0].message);
//     }

//     const tutor = await TutorModel.create(newTutor);
//     return tutor;
//   }
// }

// export default TutorService;
