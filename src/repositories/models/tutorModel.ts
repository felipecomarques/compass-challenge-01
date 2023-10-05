// import { type petModel } from './petModel'
// import { type ObjectId } from 'bson'

export interface TutorModel {
  id?: string
  name: string
  password: string
  phone: string
  email: string
  dateOfBirth: Date
  zipCode: string
  // pets: petModel[]
}
