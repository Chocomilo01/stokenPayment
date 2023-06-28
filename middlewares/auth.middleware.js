const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticate = (req, res, next) => {
    const token = req.header("authorizaton");

    if(!token) return res.status(401).send("Access denied. not authenticated");

    try{
        const secretKey = process.env.JWT_SECRET_KEY;
        const user = jwt.verify(token, secretKey);

        req.user = user;
        console.log(user);
        req.userId = user.userId;
        req.userRole = user.role;
        next();
        

    } catch (ex) {
        res.status(400).send("Access denied. Token not valid")
    }
};

const Authorizer = (req, res, next) => {
    if (req.userRole !== "admin" || "suparadmin") {
        return res
            .status(401)
            .json({ message: "Not authorized to access resource", success: false });
    }
    next();
};


module.exports = { authenticate, Authorizer }