const request = require('supertest');
const app = require('../app');
const User = require('../app/models/users');

test("Should create the user: Checking with new User", async () =>{
  await User.findOneAndRemove({email: 'ravi.t@wal.com'});
  await request(app)
    .post('/users')
    .send({
          "firstName": "Ravi",
          "lastName": "T",
          "email": "ravi.t@wal.com",
          "password": "ravit123",
          "phone": "96184602210",
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
          "email": "ravikumar.t@westagilelabs.com",
          "password": "Ravi123",
          "phone": "9618460221",
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