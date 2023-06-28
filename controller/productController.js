const ProductService = require('../services/productServices')



class ProductController{

    async createProduct(req, res){
        const body = req.body
        console.log(body)

        // Check if a form of that title already exist
        // If not create the form
        const existingProduct = await ProductService.fetchOne({name: body.name.toLowerCase()})
        if(existingProduct) return res.status(403).json({
            success: false,
            message: 'Product already exist'
        })



        const createdProduct = await ProductService.create(body)
            return res.status(201).json({
            success: true,
            message: 'Product Created Successfully',
            data: createdProduct
        })
    }


async updateProduct(req, res){
        const updateData = req.body
        const productId = req.params.id
    
            // Fetch the user with the id
        const existingProduct = await ProductService.fetchOne({_id: productId})
         if(!existingProduct) res.status(403).json({
          success: false,
                message: 'Product not found'
     })
        if(updateData.name){
            const existingProductWithUpdateName = await ProductService.fetchOne({
            name: updateData.name.toLowerCase()
        })
        if(existingProductWithUpdateName._id.toString() !== productId){
            return res.status(403).json({
         success: false,
         message: 'Product with that title already exist'
                 });
             }
        }
        const updatedData = await ProductService.update(productId, updateData)
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: updatedData
        })

     }

    async fetchProducts(req, res){
        console.log('I am now done with authentication')
        const allProducts = await  ProductService.fetch({});

        return res.status(200).json({
            success: true,
            message: 'Product Fetched Successfully',
            data: allProducts
        })

    }

    async fetchOneProduct(req, res){
        const productId = req.params.id
        const productToFetch = await ProductService.fetchOne({_id: productId});

        if(!productToFetch) res.status(403).json({
            success: false,
            message: 'Form not found'
        })

         res.status(200).json({
            success: true,
            message: 'Form Fetched Successfully',
            data: productToFetch
        })

    }


    async deleteProduct(req, res){
        const productId = req.params.id
        const productToFetch = await  ProductService.fetchOne({_id: productId});

        if(!productToFetch) return res.status(404).json({
            success: false,
            message: 'Form not found'
        })

        const deletedProduct = await ProductService.delete(productId);

        return res.status(200).json({
            success: true,
            message: 'Form Deleted Successfully',
            data: deletedProduct
        })

    }
}

module.exports = new ProductController()