const request = require('supertest');
const app = require('../app');

test("Should not create the user", async () =>{
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



test("Should not return users", async () =>{
    await request(app)
      .get('/users')
      .expect(400)
})