import { app } from '@src/app'
import supertest from 'supertest'

describe('Test for DELETE method on Tutors', () => {
  let authToken: string
  let tutorId: string
  let petId: string
  let inicialTutorId: string

  beforeAll(async () => {
    const postTutor = await supertest(app).post('/tutor').send({
      name: 'Test tutor - DELETE',
      password: '12345',
      phone: '123456789',
      email: 'testDelete@test.com',
      dateOfBirth: '2000',
      zipCode: '12345'
    })
    const authTutor = await supertest(app).post('/auth').send({
      email: 'testDelete@test.com',
      password: '12345'
    })
    inicialTutorId = postTutor.body.id
    authToken = authTutor.body.token
  })

  afterAll(async () => {
    await supertest(app).delete(`/tutor/${inicialTutorId}`).set('Authorization', `Bearer ${authToken}`)
  })

  beforeEach(async () => {
    const postTutor = await supertest(app).post('/tutor').send({
      name: 'Test tutor - DELETE',
      password: '12345',
      phone: '123456789',
      email: 'testExempleDELETE@test.com',
      dateOfBirth: '2000',
      zipCode: '12345'
    })
    tutorId = postTutor.body.id
  })

  afterEach(async () => {
    await supertest(app).delete(`/tutor/${tutorId}`).set('Authorization', `Bearer ${authToken}`)
  })

  it('Should delete a tutor and return 204 status code', async () => {
    const response = await supertest(app)
      .delete(`/tutor/${tutorId}`).set('Authorization', `Bearer ${authToken}`)
    expect(response.status).toBe(204)
  })

  it('Should return status code 409 if tutor have a pet associated', async () => {
    const PetResponse = await supertest(app).post(`/pet/${tutorId}`)
      .set('Authorization', `Bearer ${authToken}`).send({
        name: 'Pet - Delete Tutor 1',
        species: 'dog',
        carry: 'p',
        weight: 5,
        dateOfBirth: '2000-01-01'
      })
    petId = PetResponse.body.id
    const DeleteResponse = await supertest(app).delete(`/tutor/${tutorId}`)
      .set('Authorization', `Bearer ${authToken}`)
    await supertest(app).delete(`/pet/${petId}/tutor/${tutorId}`).set('Authorization', `Bearer ${authToken}`)
    expect(DeleteResponse.status).toBe(409)
    expect(DeleteResponse.body).toEqual({
      error: 'Cannot delete due to dependencies'
    })
  })

  it('Should return status code 401 if it does not have authentication', async () => {
    const response = await supertest(app).delete(`/tutor/${tutorId}`)
    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      error: 'Token is missing'
    })
  })

  it('Should return status code 401 if it does have invalid authentication', async () => {
    const response = await supertest(app)
      .delete(`/tutor/${tutorId}`).set('Authorization', `Bearer ${authToken + 1}`)
    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      error: 'Token invalid'
    })
  })
})
