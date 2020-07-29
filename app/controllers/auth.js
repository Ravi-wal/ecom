const jwt = require("../config/jwt");
const user = require("../controllers/users");
const response = require('../config/response');

const login = async (req, res) => {
  try {
    let loginRes = await user.checkUser(req.body.email, req.body.password);
    if(!!loginRes) {
        let token = await jwt.generateToken(loginRes._id, loginRes.firstName, loginRes.lastName, loginRes.userType);
        response.success({
                            message: "Successfully Logged in",
                            email: req.body.email,
                            token: token
                          }, res);
    } else {
      response.success('Invalid Email or Password', res);
    }
  } catch (err) {
    console.log('Error: ' + err);
    response.internalError(res);
  }
};

module.exports = {
  login
};
