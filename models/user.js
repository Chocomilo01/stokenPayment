 
 const mongoose = require("mongoose");
const { isAdmin } = require("../middlewares/auth.middleware");

 const userSchema = new mongoose.Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 30},
    email: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 266,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 1024,
    },
    // isAdmin: { 
    //     type: Boolean,
    //     default: false
    //  },
        
     role: {
        type: String,
        required: false,
        enum: ["user", "admin", "superadmin"],
        default: "user",
     }
 });
const User = mongoose.model("User", userSchema);

exports.User = User;
