const jwt = require("../config/jwt");
const user = require("../controllers/users");

const login = async (req, res) => {
  try {
    let loginRes = await user.checkUser(req.body.email, req.body.password);
    if(!!loginRes) {
        let token = await jwt.generateToken(loginRes._id, loginRes.firstName, loginRes.lastName, loginRes.userType);
        res.status(200).json({
          success: true,
          message: "Successfully Logged in",
          email: req.body.email,
          token: token
        });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid Email or Password'
      })
    }
  } catch (err) {
    console.log('Error: ' + err);
    res.status(500).json({ message: "Something went wrong. Please try again" });
  }
};

module.exports = {
  login
};
