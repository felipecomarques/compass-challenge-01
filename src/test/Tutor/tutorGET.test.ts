import { app } from '@src/app'
import supertest from 'supertest'

describe('Test for GET method on Tutors', () => {
  let id: string
  let authToken: string

  beforeAll(async () => {
    const postTutor = await supertest(app).post('/tutor').send({
      name: 'Test tutor - GET',
      password: '12345',
      phone: '123456789',
      email: 'testGet@test.com',
      dateOfBirth: '2000',
      zipCode: '12345'
    })
    const authTutor = await supertest(app).post('/auth').send({
      email: 'testGet@test.com',
      password: '12345'
    })
    id = postTutor.body.id
    authToken = authTutor.body.token
  })

  afterAll(async () => {
    await supertest(app).delete(`/tutor/${id}`).set('Authorization', `Bearer ${authToken}`)
  })

  it('Should return a list of tutors and return 200 status code', async () => {
    const response = await supertest(app)
      .get('/tutor').set('Authorization', `Bearer ${authToken}`)
    expect(response.status).toBe(200)
  })

  it('Should return status code 401 if it does not have authentication', async () => {
    const response = await supertest(app).get('/tutor')
    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      error: 'Token is missing'
    })
  })

  it('Should return status code 401 if it does have invalid authentication', async () => {
    const response = await supertest(app)
      .get('/tutor').set('Authorization', `Bearer ${authToken + 1}`)
    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      error: 'Token invalid'
    })
  })
})
