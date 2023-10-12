import { app } from '../../app'
import supertest from 'supertest'

describe('Test for POST method on Tutors', () => {
  let authToken: string
  let id: string

  beforeAll(async () => {
    const response = await supertest(app).post('/tutor/').send({
      name: 'Test tutor - AUTH',
      password: '12345',
      phone: '123456789',
      email: 'tutorAAAAUTH@test.com',
      dateOfBirth: '2000',
      zipCode: '12345'
    })
    id = response.body.id
  })

  it('Should create a new token', async () => {
    const userData = {
      name: 'tutorAUTH@test.com',
      password: '12345'
    }
    const response = await supertest(app).post('/auth').send(userData)
    authToken = response.body.token
    expect(response.status).toBe(200)
  })

  it('Should return 400 for incorrect password', async () => {
    const userData = {
      email: 'tutorAUTH@test.com',
      password: `12345${6}`
    }
    const response = await supertest(app).post('/auth').send(userData)
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'User or password incorrect'
    })
  })

  it('Should return 400 for incorrect email', async () => {
    const userData = {
      email: `${6}tutorAUTH@test.com`,
      password: '12345'
    }
    const response = await supertest(app).post('/auth').send(userData)
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'User or password incorrect'
    })
  })

  afterAll(async () => {
    await supertest(app).delete(`/tutor/${id}`).set('Authorization', `Bearer ${authToken}`)
  })
})
