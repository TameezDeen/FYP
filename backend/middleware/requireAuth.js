const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    
    // Check if the request is for the new endpoint that doesn't require authentication
    if (req.path === '/api/song/filtered-songs' && req.method === 'POST') {
        // If it's the new endpoint, bypass authentication and move to the next middleware
        return next();
    }
    
    //verify authentication
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try{
       const {_id} = jwt.verify(token, process.env.SECRET) 

       req.user = await User.findOne({_id}).select('_id')
       next() 
        
    }catch(error){
        console.log(error)
        res.status(401).json({error: "Request is not authorized"})
    }
}

module.exports = requireAuth