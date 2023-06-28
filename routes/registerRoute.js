const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const { User } = require("../models/user");
const {isAdmin} = require('../middlewares/auth.middleware');
const genAuthToken = require("../utils/genAuthToken");



const router = express.Router()

router.post("/", async (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(), 
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
        roles: Joi.string(),
    });

    const {error} = schema.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);
    //check if user already exist
    let user = await User.findOne({ email: req.body.email });

    if(user) return res.status(400).send("User already exist..");

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles,
    });
    
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    
    user = await user.save()

    const token = genAuthToken(user)

    res
    .status(200)
    .json({
    message: "Registered Successfully",
    data: { user, token },
    success: true,
});
})
 module.exports = router;