const User = require("../models/users");
//const UserRoles = require("../models/userRoles");

const create = async (req, res) => {
  try{
    if(await User.findOne({ email: req.body.email })){
      return res.status(422).json({
        status: false, 
        message: "Already registered with the email " + req.body.email
      });
    } else {
      await createUser(req.body);
      res.status(200).json({ status: true, message: "User created succesfully" });
    }
  } catch(err){
    return res.status(500).json({ status: false,  message: "Something went wrong" });
  }
};


function createUser(details) {
  const user = new User(details);
  user.save().catch(err => {
    throw err;
  });
}


const list = (req, res) => {
  User.find()
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(err => {
      return res.status(400).json({ status: false, message: "Something went wrong" });
    });
};

const checkUser = async (email, password) => {
  const user = await User.findOne({ email: email, password: password, active: 1 });
  return user;
};


module.exports = {
  create,
  list,
  checkUser
};
