const request = require('supertest');
const app = require('../app');


test("Should create the user: Checking with new User", async () =>{
  await request(app)
    .post('/users')
    .send({
          "firstName": "Ravi",
          "lastName": "T",
          "email": "ravikumar.t123@wal.com",
          "password": "ravi123",
          "phone": "9618460221",
          "userType": 2,
          "active": 1
      })
    .expect(200)
});


test("Should not create the user: Checking with existing user", async () =>{
  await request(app)
    .post('/users')
    .send({
          "firstName": "Ravi",
          "lastName": "T",
          "email": "ravi1@wal.com",
          "password": "kumar123",
          "phone": "96184602219",
          "userType": 2,
          "active": 1
      })
    .expect(400)
});


test("Should not return users: Only the admin can get users", async () =>{
    await request(app)
      .get('/users')
      .expect(400)
})