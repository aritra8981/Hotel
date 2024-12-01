const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    //Check if the authorization header is present
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error: 'Token not found'});

    //Get the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    try{
        //Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //Set the user in the request object
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error: 'invalid token'});
    }
};

//Funtion to generate the token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = {jwtAuthMiddleware, generateToken};