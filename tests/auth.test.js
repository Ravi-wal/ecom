const request = require('supertest');
const app = require('../app');

test("Login functinality", async () =>{
  await request(app)
    .post('/auth')
    .send({
        "email": "ravikumar.t@westagilelabs.com",
        "password": "Ravi123"
      })
    .expect(200)
});

test("Invalid Login Creds", async () =>{
    await request(app)
      .post('/auth')
      .send({
          "email": "ravikumar.t@westagilelabs.com",
          "password": "notMyPass"
        })
      .expect(422)
  });