import { app } from '@src/app'
import request from 'supertest'

describe('Test for GET method on index', () => {
  it('Should return index message and status code 418', async () => {
    const response = await request(app)
      .get('/')

    const data = JSON.parse(response.text)
    expect(data).toBeInstanceOf(Object)
    expect(data).toBeTruthy()
    expect(response.status).toBe(418)
  })
})
