const jwt = require('jsonwebtoken');
const algorithm = 'HS512';
const privateKey = 'myPrivateKeyHere';

const isAuthorized = (req,res,next) => {
    if(req.headers.authorization !== undefined) {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, privateKey, { algorithm: algorithm }, (err, user) => {
            if (err) {  
                return res.status(500).json({ error: "Invalid Key" });
            }
            req.body.UserId = user.UserId;
            req.body.UserType = user.UserType;
            return next();
        });
    } else {
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    }
}


const isAdmin = (req,res,next) => {
    if(req.body.UserType === 1) {
            return next();
    } else {
        res.status(500).json({ success: false, message: "Not Authorized" });
    }
}

const generateToken =  (UserId, FirstName, LastName, UserType) => {
    let jToken = jwt.sign({UserId, FirstName, LastName, UserType},privateKey,{algorithm: algorithm,expiresIn: '180000'});
    return jToken;
   
 }
 

 module.exports = {
    isAuthorized,
    generateToken,
    isAdmin
}