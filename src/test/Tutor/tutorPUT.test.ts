import { app } from '@src/app'
import supertest from 'supertest'

describe('Test for PUT method on Tutors', () => {
  let authToken: string
  let id: string
  let inicialTutorId: string

  beforeAll(async () => {
    const postTutor = await supertest(app).post('/tutor').send({
      name: 'Test tutor - PUT',
      password: '12345',
      phone: '123456789',
      email: 'testPut@test.com',
      dateOfBirth: '2000',
      zipCode: '12345'
    })
    const authTutor = await supertest(app).post('/auth').send({
      email: 'testPut@test.com',
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
      name: 'Test tutor - PUT',
      password: '12345',
      phone: '123456789',
      email: 'testExemplePUT@test.com',
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
      name: 'Edited Tutor - PUT',
      password: '321',
      phone: '987654321',
      email: 'testPut1@test.com',
      dateOfBirth: '2000-12-12',
      zipCode: '61760000'
    }
    const response = await supertest(app).put(`/tutor/${id}`)
      .set('Authorization', `Bearer ${authToken}`).send(tutorData)
    expect(response.status).toBe(200)
  })

  it('Should return status code 400 with the incorrect fields', async () => {
    const tutorData = {
      password: '321',
      phone: 'abc',
      email: 'testPut2test.com',
      dateOfBirth: '',
      zipCode: '61760000'
    }

    const expectedResponse = {
      error: 'Validation error',
      fields: {
        name: ['Required'],
        dateOfBirth: ['Invalid date'],
        email: ['Invalid email'],
        phone: ['String must contain at least 8 character(s)']
      }
    }
    const response = await supertest(app).put(`/tutor/${id}`)
      .set('Authorization', `Bearer ${authToken}`).send(tutorData)
    expect(response.status).toBe(400)
    expect(response.body).toEqual(expectedResponse)
  })

  it('Should return status code 401 if it does not have authentication', async () => {
    const response = await supertest(app).put(`/tutor/${id}`)
    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      error: 'Token is missing'
    })
  })

  it('Should return status code 401 if it does have invalid authentication', async () => {
    const response = await supertest(app)
      .put(`/tutor/${id}`).set('Authorization', `Bearer ${authToken + 1}`)
    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      error: 'Token invalid'
    })
  })
})
