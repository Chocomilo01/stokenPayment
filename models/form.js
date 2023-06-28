// const mongoose = require("mongoose");

// const ProductSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     brand: { type: String, required: true },
//     desc: { type: String, required: true },
//     price: { type: Number, required: true },
//   },
//   { timestamps: true }
// );

// const ProductModel = mongoose.model("ProductModel", ProductSchema);

// exports.Product = ProductModel;




const mongoose = require('mongoose')

const FormSchema = new mongoose.Schema({
    name: {
       type: String,
        //required: true,
        trim: true,
         unique: false,
         lowercase: true,
         
    },
    email: {
        type: String,
       
    },
    phone: {
        type:Number,
        required:true,
        minlength:10,
        maxlength:11
  },
    address: {
        type: String,
        required: true,
    
    },
    state: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
      },

},{ timestamps: true });
module.exports = mongoose.model('FormModel', FormSchema)