import { app } from '@src/app'
import supertest from 'supertest'

describe('Test for PUT method on Pets', () => {
  let authToken: string
  let tutorId: string
  let petId: string
  let inicialTutorId: string

  beforeAll(async () => {
    const postTutor = await supertest(app).post('/tutor').send({
      name: 'Test pet - PUT',
      password: '12345',
      phone: '123456789',
      email: 'testPetPUT@test.com',
      dateOfBirth: '2000',
      zipCode: '12345'
    })
    const authTutor = await supertest(app).post('/auth').send({
      email: 'testPetPUT@test.com',
      password: '12345'
    })
    inicialTutorId = postTutor.body.id
    authToken = authTutor.body.token
  })

  beforeEach(async () => {
    const postTutor = await supertest(app).post('/tutor').send({
      name: 'Test pet - PUT',
      password: '12345',
      phone: '123456789',
      email: 'testExemplePetPUT@test.com',
      dateOfBirth: '2000',
      zipCode: '12345'
    })
    tutorId = postTutor.body.id

    const postPet = await supertest(app).post(`/pet/${tutorId}`)
      .set('Authorization', `Bearer ${authToken}`).send({
        name: 'Test pet - PUT',
        species: 'dog',
        carry: 'p',
        weight: 5,
        dateOfBirth: '2000-01-01'
      })
    petId = postPet.body.id
  })

  afterEach(async () => {
    await supertest(app).delete(`/pet/${petId}/tutor/${tutorId}`)
      .set('Authorization', `Bearer ${authToken}`)
    await supertest(app).delete(`/tutor/${tutorId}`)
      .set('Authorization', `Bearer ${authToken}`)
    petId = '0'
  })

  afterAll(async () => {
    await supertest(app).delete(`/tutor/${inicialTutorId}`).set('Authorization', `Bearer ${authToken}`)
  })

  it('Should edited a pet and return 200 status code', async () => {
    const petData = {
      name: 'Test pet - PUT (EDITED)',
      species: 'dog',
      carry: 'm',
      weight: 7,
      dateOfBirth: '2000-01-01'
    }
    const response = await supertest(app)
      .put(`/pet/${petId}/tutor/${tutorId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(petData)
    expect(response.status).toBe(200)
  })

  it('Should return status code 400 with the incorrect fields', async () => {
    const petData = {
      name: 'Test pet - PATCH (EDITED)',
      species: 'dog',
      weight: 'a',
      dateOfBirth: '2000-01-01'
    }

    const expectedResponse = {
      error: 'Validation error',
      fields: {
        carry: ['Required'],
        weight: ['Expected number, received string']
      }
    }
    const response = await supertest(app)
      .put(`/pet/${petId}/tutor/${tutorId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(petData)
    expect(response.status).toBe(400)
    expect(response.body).toEqual(expectedResponse)
  })

  it('Should return 400 if it does not have authentication', async () => {
    const response = await supertest(app).put(`/pet/${petId}/tutor/${tutorId}`)
    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      error: 'Token is missing'
    })
  })

  it('Should return 401 if it does have invalid authentication', async () => {
    const response = await supertest(app).put(`/pet/${petId}/tutor/${tutorId}`)
      .set('Authorization', `Bearer ${authToken + 1}`)
    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      error: 'Token invalid'
    })
  })
})
