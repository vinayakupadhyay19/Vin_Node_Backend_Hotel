const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next ) =>{

    if(!req.headers.authorization) return res.status(401).json({messege : 'Token not found !'})

    // Extract he jwt token from the request headers
    
    const token = req.headers.authorization.split(' ')[1];
    
    if(!token) return res.status(401).json({message : 'Unauthorised !'});

    try{
        //Verify the token
        const decoded = jwt.verify(token , process.env.SECRET_KEY);

        req.userTokenInfo = decoded;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error : 'Invalid token !'})
    }
}

//function to generete jwt token 
const genToken = (userData) =>{
    return jwt.sign(userData , process.env.SECRET_KEY , {expiresIn : 30000});
}

module.exports = {jwtAuthMiddleware,genToken};