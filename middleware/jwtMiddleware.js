const jwt = require("jsonwebtoken")

const jwtMiddleware = (req,res,next) =>{
    console.log(`inside jwt middleware`);
    const token = req.headers["authorization"].split(" ")[1]
     
    console.log(token);
    try {
        console.log("verfication started");
        
        const jwtResponse = jwt.verify(token,process.env.secret)
        console.log(jwtResponse);
        console.log(`not working`);
        req.payload = jwtResponse.userMail
        next()
    } catch (error) {
        res.status(401).json("Authorization Failed",error)
    }
}

module.exports = jwtMiddleware
