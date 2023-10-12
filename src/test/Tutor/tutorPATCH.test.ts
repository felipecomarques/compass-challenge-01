import { app } from '@src/app'
import supertest from 'supertest'

describe('Test for PATCH method on Tutors', () => {
  let authToken: string
  let id: string
  let inicialTutorId: string

  beforeAll(async () => {
    const postTutor = await supertest(app).post('/tutor').send({
      name: 'Test tutor - PATCH',
      password: '12345',
      phone: '123456789',
      email: 'testPatch@test.com',
      dateOfBirth: '2000',
      zipCode: '12345'
    })
    const authTutor = await supertest(app).post('/auth').send({
      email: 'testPatch@test.com',
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
      name: 'Test tutor - PATCH',
      password: '12345',
      phone: '123456789',
      email: 'testExemplePATCH@test.com',
      dateOfBirth: '2000',
      zipCode: '12345'
    })
    id = postTutor.body.id
  })

  afterEach(async () => {
    await supertest(app).delete(`/tutor/${id}`).set('Authorization', `Bearer ${authToken}`)
  })

  it('Should edit an existing Tutor and return 200 status code', async () => {
    const tutorData = {
      password: '123456',
      email: 'testPatch1@test.com'
    }
    const response = await supertest(app).patch(`/tutor/${id}`)
      .set('Authorization', `Bearer ${authToken}`).send(tutorData)
    expect(response.status).toBe(200)
  })

  it('Should return status code 400 with the incorrect fields', async () => {
    const tutorData = {
      password: '123456',
      phone: 'abc',
      email: 'testPatch12est.com'
    }

    const expectedResponse = {
      error: 'Validation error',
      fields: {
        email: ['Invalid email'],
        phone: ['String must contain at least 8 character(s)']
      }
    }
    const response = await supertest(app).patch(`/tutor/${id}`)
      .set('Authorization', `Bearer ${authToken}`).send(tutorData)
    expect(response.status).toBe(400)
    expect(response.body).toEqual(expectedResponse)
  })

  it('Should return status code 401 if it does not have authentication', async () => {
    const response = await supertest(app).patch(`/tutor/${id}`)
    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      error: 'Token is missing'
    })
  })

  it('Should return status code 401 if it does have invalid authentication', async () => {
    const response = await supertest(app)
      .patch(`/tutor/${id}`).set('Authorization', `Bearer ${authToken + 1}`)
    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      error: 'Token invalid'
    })
  })
})
