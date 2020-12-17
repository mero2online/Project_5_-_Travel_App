// Import this to fix this issue [referenceerror: regeneratorruntime is not defined]
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const request = require('supertest');
const app = require('../src/server/server');

describe('Post Endpoints', () => {
  it('should post data and receive same', async () => {
    const res = await request(app).post('/test').send({
      message: 'pass!',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'pass!');
    expect(res.body).toMatchObject({ message: 'pass!' });
  });
});
