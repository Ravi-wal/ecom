const request = require('supertest');
const app = require('../app');

test("Should get categories", async () =>{
  await request(app)
    .get('/categories')
    .expect(200)
});
