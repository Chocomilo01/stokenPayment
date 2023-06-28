
const FormModel = require('../models/form')


class FormService{

    // Add Form
    async create(formData){
        return await FormModel.create(formData)
    }

    // Update a Form 
    async update(id, formupdate){
        return await FormModel.findByIdAndUpdate(id, formupdate, {
            new: true
        })
    }

    // Delete a Form 
    async delete(id){
        return await FormModel.findByIdAndDelete(id)
    }

    // Get a single Form
    async fetchOne(filter) {
        return await FormModel.findOne(filter)
    }

    // Get all Form 
    async fetch(filter){
        return await FormModel.find(filter)
    }
}

module.exports = new FormService() 