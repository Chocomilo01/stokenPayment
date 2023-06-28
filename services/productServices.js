
const ProductModel = require('../models/ProductModel')

class ProductService{

    // Add product
    async create(productData){
        return await ProductModel.create(productData)
    }

    // Update a product 
    async update(id, productupdate){
        return await ProductModel.findByIdAndUpdate(id, productupdate, {
            new: true
        })
    }

    // Delete a product 
    async delete(id){
        return await ProductModel.findByIdAndDelete(id)
    }

    // Get a single product
    async fetchOne(filter) {
        return await ProductModel.findOne(filter)
    }

    // Get all product 
    async fetch(filter){
        return await ProductModel.find(filter)
    }
}

module.exports = new ProductService() 