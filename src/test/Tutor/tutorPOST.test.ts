import { app } from '@src/app'
import supertest from 'supertest'

describe('Test for POST method on Tutors', () => {
  let authToken: string
  let id: string
  let inicialTutorId: string

  beforeAll(async () => {
    const postTutor = await supertest(app).post('/tutor').send({
      name: 'Test tutor - POST',
      password: '12345',
      phone: '123456789',
      email: 'testPost@test.com',
      dateOfBirth: '2000',
      zipCode: '12345'
    })
    const authTutor = await supertest(app).post('/auth').send({
      email: 'testPost@test.com',
      password: '12345'
    })
    inicialTutorId = postTutor.body.id
    authToken = authTutor.body.token
  })

  afterAll(async () => {
    await supertest(app).delete(`/tutor/${inicialTutorId}`).set('Authorization', `Bearer ${authToken}`)
  })

  afterEach(async () => {
    await supertest(app).delete(`/tutor/${id}`).set('Authorization', `Bearer ${authToken}`)
  })

  it('Should create a new tutor and return 201 status code', async () => {
    const tutorData = {
      name: 'John Doe',
      password: '123',
      phone: '123456789',
      email: 'teste1@test.com',
      dateOfBirth: '2000-12-12',
      zipCode: '61760000'
    }

    const response = await supertest(app).post('/tutor').send(tutorData)
    id = response.body.id
    expect(response.status).toBe(201)
  })

  it("Should return status code 400 if doesn't contain all fields", async () => {
    const tutorData = {
      name: 'John Doe',
      phone: '123456789',
      email: 'test2@test.com',
      dateOfBirth: '2000-12-12',
      zipCode: '61760000'
    }

    const expectedResponse = {
      error: 'Validation error',
      fields: {
        password: ['Required']
      }
    }
    const response = await supertest(app).post('/tutor').send(tutorData)
    expect(response.status).toBe(400)
    expect(response.body).toEqual(expectedResponse)
  })

  it('Should return status code 400 if fields are invalid', async () => {
    const tutorData = {
      name: 'John Doe',
      password: '123',
      phone: 'abc',
      email: 'test3@test.com',
      dateOfBirth: '2000-12-12',
      zipCode: '61760000'
    }

    const expectedResponse = {
      error: 'Validation error',
      fields: {
        phone: ['String must contain at least 8 character(s)']
      }
    }
    const response = await supertest(app).post('/tutor').send(tutorData)
    expect(response.status).toBe(400)
    expect(response.body).toEqual(expectedResponse)
  })

  it('Should return status code 400 if email is invalid', async () => {
    const tutorData = {
      name: 'John Doe',
      password: '123',
      phone: '123456789',
      email: 'teste4test.com',
      dateOfBirth: '2000-12-12',
      zipCode: '61760000'
    }

    const expectedResponse = {
      error: 'Validation error',
      fields: {
        email: ['Invalid email']
      }
    }

    const response = await supertest(app).post('/tutor').send(tutorData)
    expect(response.status).toBe(400)
    expect(response.body).toEqual(expectedResponse)
  })

  it('Should return status code 409 if email repeats', async () => {
    const tutorData1 = {
      name: 'John Doe',
      password: '123',
      phone: '123456789',
      email: 'testRepeat@test.com',
      dateOfBirth: '2000-12-12',
      zipCode: '61760000'
    }
    const tutorData2 = {
      name: 'John Doe',
      password: '123',
      phone: '123456789',
      email: 'testRepeat@test.com',
      dateOfBirth: '2000-12-12',
      zipCode: '61760000'
    }

    const expectedResponse = {
      error: 'Duplicate Tutor_email_key'
    }

    const response1 = await supertest(app).post('/tutor').send(tutorData1)
    expect(response1.status).toBe(201)
    id = response1.body.id
    const response2 = await supertest(app).post('/tutor').send(tutorData2)
    expect(response2.status).toBe(409)
    expect(response2.body).toEqual(expectedResponse)
  })
})
