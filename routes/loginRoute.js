const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const { User } = require("../models/user");
const authenticate = require('../middlewares/auth.middleware');
const genAuthToken = require("../utils/genAuthToken");
const secretKey = process.env.JWT_SECRET_KEY



const router = express.Router()

router.post("/", async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
        role: Joi.string(),
    });

    const {error} = schema.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });

    if(!user) return res.status(400).send("user not registered...");

    //evaluate password
    
    const isValid = await bcrypt.compare(req.body.password, user.password)

    if (!isValid) return res.status(400).send("Invalid email or password...")

    const token = genAuthToken({ userIdp: user._id, role: user.role }, secretKey, { expiresIn: "30s" });

    res
    .status(200)
    .json({
    message: "Login Successful",
    data: { user, token },
    success: true,
});
});
 
module.exports = router;