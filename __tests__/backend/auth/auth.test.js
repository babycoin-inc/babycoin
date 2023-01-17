const request = require('supertest');
// const app = require('../../../server');

const sum = (a, b) => {
  return a + b
}

describe('dummy test', () => {
  test('adds 2 + 4 to equal 6', () => {
    expect(sum(2, 4)).toBe(6)
  })
})

// describe('POST /login', () => {
//   it('should authenticate a user with the correct credentials', async () => {
//     const response = await request(app)
//       .post('/login')
//       .send({
//         username: 'testuser',
//         password: 'password'
//       });
//     expect(response.status).toBe(200);
//   });

// })