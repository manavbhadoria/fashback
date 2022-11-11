const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
    if(authHeader) {
        jwt.verify(authHeader, "fashback", (err,user) => {
            if (err) 
                res.status(403).json("Token is not valid!");
                req.user = user;
                next();
        });
    }
    else {
        return res.status(401).json("You are not authenticated!");
    }
};
const verifyTokenAndAdmin = (req, res, next) => {
verifyToken(req, res, () => {
        if (req.user.isAdmin) {
        next();
        } else {
        console.log(req.user.isAdmin);
        res.send("behenchod")
        }
    });
    };
module.exports = {verifyToken, verifyTokenAndAdmin};
