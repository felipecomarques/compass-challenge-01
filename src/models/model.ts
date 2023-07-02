import mongoose, { Schema, Document } from "mongoose";

export interface IPet {
  id: number;
  name: string;
  species: string;
  carry: string;
  weight: number;
  date_of_birth: Date;
}

export interface ITutor extends Document {
  id: number;
  name: string;
  phone: string;
  email: string;
  date_of_birth: Date;
  zip_code: string;
  pets: IPet[];
}

const petSchema = new Schema<IPet>(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    species: { type: String, required: true },
    carry: { type: String, required: true },
    weight: { type: Number, required: true },
    date_of_birth: { type: Date, required: true },
  },
  { _id: false}
);

const tutorSchema = new Schema<ITutor>(
  {
    id: { type: Number, required: false },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    date_of_birth: { type: Date, required: false },
    zip_code: { type: String, required: true },
    pets: { type: [petSchema], required: false },
  },
);

tutorSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret._id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const TutorModel = mongoose.model<ITutor>("Tutor", tutorSchema);

export { TutorModel, petSchema, tutorSchema };
