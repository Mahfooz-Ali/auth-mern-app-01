const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next)=>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403)
        .json({message:"Unauthorized, JWT token is require"});
    }
    try {
        //console.log("JWT_SECRET:", process.env.JWT_SECRET);
        //console.log("Auth is :", auth);
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        //console.log(" decoded Auth is :", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        //console.log("❌ JWT ERROR:", error.message);
        return res.status(403)
        .json({message:"Unauthorized, JWT token wrong or expired"});
    }
}

module.exports = ensureAuthenticated;