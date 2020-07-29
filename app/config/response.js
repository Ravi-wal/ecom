const success = (message,res) => {
    return res.status(200).json({ 
                            status: true,  
                            response: message
                        });
}

const failed = (message,res) => {
    return res.status(400).json({ 
                            status: false,  
                            response: message
                        });
}

const internalError = (res) => {
    return res.status(500).json({ 
                            status: false,  
                            response: "Something went wrong. Please try again!!!" 
                        });
}

const notAuthorized = (res) => {
    return res.status(401).json({ 
        status: false,  
        response: "Not authorized"
    });
}

module.exports = {
    success,
    failed,
    internalError,
    notAuthorized
}