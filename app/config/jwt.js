const jwt = require('jsonwebtoken');
const response = require('../config/response');
const algorithm = 'HS512';
const privateKey = 'myPrivateKeyHere';

const isAuthorized = (req,res,next) => {
    if(req.headers.authorization !== undefined) {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, privateKey, { algorithm: algorithm }, (err, user) => {
            if (err) {  
                response.failed("Invalid Key", res);
            } else {
                req.body.userId = user.userId;
                req.body.userType = user.userType;
                return next();
            }
        });
    } else {
        response.failed("Token required", res);
    }
}


const isAdmin = (req,res,next) => {
    if(req.body.userType === 1) {
        return next();
    }
    response.notAuthorized(res);
}

const generateToken =  (userId, firstName, lastName, userType) => {
    let jToken = jwt.sign({userId, firstName, lastName, userType},privateKey,{algorithm: algorithm,expiresIn: '1h'});
    return jToken;
   
 }
 

 module.exports = {
    isAuthorized,
    generateToken,
    isAdmin
}