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

const ProductSchema = new mongoose.Schema({
    name: {
       // category: String,
       type: String,_id: mongoose.Types.ObjectId,
        required: true,
        trim: true,
         unique: true,
         lowercase: true,
         
    },
    price: {
        type: String,
        required: true,
        trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
  },
    description: {
        type: String,
        required: true,
    },

},{ timestamps: true });
module.exports = mongoose.model('ProductModel', ProductSchema)