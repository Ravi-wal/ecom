const User = require("../models/users");
//const UserRoles = require("../models/userRoles");

const create = async (req, res) => {
 
  try{
    if(await User.findOne({ Email: req.body.Email })){
      return res.status(422).json({
        status: false, 
        message: "Already registered with the email " + req.body.Email
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
  console.log(details);
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
      return res.status(400).json({ message: "Something went wrong" });
    });
};

const findone = (req, res) => {
let userId = req.body.userId ? req.body.userId : req.params.userId;
  User.findById(userId)
    .then(data => {
      if (!data) {
        return res
          .status(404)
          .json({ message: "User Not Found with ID " + userId });
      }
      return res.status(200).json(data);
    })
    .catch(err => {
      return res.status(500).json({
        message: "Some thing went wrong with the ID " + userId
      });
    });
};

const update = (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      status: req.body.status
    },
    { new: true }
  )
    .then(data => {
      if (!data) {
        return res.status(404).json({
          message: "User Not Found with the Update ID " + req.params.userId
        });
      }
      return res.status(200).json({success: true,message: "Updated Successfully"});
    })
    .catch(err => {
      return res.status(500).json({
        message: "Some thing went wrong with the Update ID " + req.params.userId
      });
    });
};

module.exports = {
  create,
  list,
  findone,
  update
};
