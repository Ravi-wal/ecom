const request = require('supertest');
const app = require('../app');

test("Should get products", async () =>{
  await request(app)
    .get('/products')
    .expect(200)
});
