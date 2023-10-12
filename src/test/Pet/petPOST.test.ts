import { app } from '@src/app'
import supertest from 'supertest'

describe('Test for POST method on Pet', () => {
  let authToken: string
  let tutorId: string
  let petId: string
  let inicialTutorId: string

  beforeAll(async () => {
    const postTutor = await supertest(app).post('/tutor').send({
      name: 'Test pet - POST',
      password: '12345',
      phone: '123456789',
      email: 'testPetPOST@test.com',
      dateOfBirth: '2000',
      zipCode: '12345'
    })
    const authTutor = await supertest(app).post('/auth').send({
      email: 'testPetPOST@test.com',
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
      name: 'Test pet - POST',
      password: '12345',
      phone: '123456789',
      email: 'testExemplePetPOST@test.com',
      dateOfBirth: '2000',
      zipCode: '12345'
    })
    tutorId = postTutor.body.id
  })

  afterEach(async () => {
    await supertest(app).delete(`/pet/${petId}/tutor/${tutorId}`)
      .set('Authorization', `Bearer ${authToken}`)
    await supertest(app).delete(`/tutor/${tutorId}`)
      .set('Authorization', `Bearer ${authToken}`)
    petId = '0'
  })

  it('Should create a new pet and return 201 status code', async () => {
    const petData = {
      name: 'Pet Test - POST',
      species: 'dog',
      carry: 'p',
      weight: 5,
      dateOfBirth: '2000-01-01'
    }
    const response = await supertest(app)
      .post(`/pet/${tutorId}`).set('Authorization', `Bearer ${authToken}`).send(petData)
    petId = response.body.id

    expect(response.status).toBe(201)
  })

  it('Should return 400 with the incorrect fields', async () => {
    const petData = {
      name: 'Pet Test - POST',
      carry: 'p',
      weight: 'a',
      dateOfBirth: '2000-01-01'
    }
    const response = await supertest(app).post(`/pet/${tutorId}`)
      .set('Authorization', `Bearer ${authToken}`).send(petData)
    petId = response.body.id

    const expectedResponse = {
      error: 'Validation error',
      fields: {
        species: ['Required'],
        weight: ['Expected number, received string']
      }
    }
    expect(response.status).toBe(400)
    expect(response.body).toEqual(expectedResponse)
  })

  it('Should return 400 if it does not have authentication', async () => {
    const response = await supertest(app).post(`/pet/${tutorId}`)
    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      error: 'Token is missing'
    })
  })

  it('Should return 401 if it does have invalid authentication', async () => {
    const response = await supertest(app).post(`/pet/${tutorId}`)
      .set('Authorization', `Bearer ${authToken + 1}`)
    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      error: 'Token invalid'
    })
  })
})
