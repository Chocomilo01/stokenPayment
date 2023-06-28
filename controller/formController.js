const FormService = require('../services/formServices')


class FormController{

    async createForm(req, res){
        const body = req.body
        console.log(body)

        // Check if a form of that title already exist
        // If not create the form
        const existingForm = await FormService.fetchOne({name: body.name.toLowerCase()})
        if(existingForm) return res.status(403).json({
            success: false,
            message: 'Form already exist'
        })



        const createdForm = await FormService.create(body)
            return res.status(201).json({
            success: true,
            message: 'Form Created Successfully',
            data: createdForm
        })
    }


async updateForm(req, res){
        const updateData = req.body
        const formId = req.params.id
    
            // Fetch the user with the id
        const existingForm = await FormService.fetchOne({_id: formId})
         if(!existingForm) res.status(403).json({
          success: false,
                message: 'Form not found'
     })
        if(updateData.name){
            const existingFormWithUpdateName = await FormService.fetchOne({
            name: updateData.name.toLowerCase()
        })
        if(existingFormWithUpdateName._id.toString() !== formId){
            return res.status(403).json({
         success: false,
         message: 'Form with that title already exist'
                 });
             }
        }
        const updatedData = await FormService.update(formId, updateData)
        res.status(200).json({
            success: true,
            message: 'Form updated successfully',
            data: updatedData
        })


     }

    // async editForm(req, res){
    //     const updateData = req.body
    //     const formId = req.params.id

    //     // Fetch the user with the id
    //     const existingForm = await formService.fetchOne({_id: formId})
    //     if(!existingForm) return res.status(404).json({
    //         success: false,
    //         message: 'Form not found'
    //     })

    //     // Fetching existing book title
    //     if(updateData.title){
    //         const existingFormTitle  = await formService.getForm({title: updateData.title.toLowerCase()})
    //         if(existingFormTitle){
    //         if(existingFormTitle._id.toString() !== formId){
    //         return res.status(403).json({
    //         success: false,
    //             message: 'Form with that title already exist'
    //             })
    //         }
    //     }
    // }

    //     const updatedForm = await formService.updateForm(formId, updateData)

    //     return res.status(200).json({
    //         success: true,
    //         message: 'form Updated Successfully',
    //         data: updatedForm
    //     })
    // }

    async fetchForms(req, res){
        console.log('I am now done with authentication')
        const allForms = await  FormService.fetch({});

        return res.status(200).json({
            success: true,
            message: 'Form Fetched Successfully',
            data: allForms
        })

    }

    async fetchOneForm(req, res){
        const formId = req.params.id
        const formToFetch = await FormService.fetchOne({_id: formId});

        if(!formToFetch) res.status(403).json({
            success: false,
            message: 'Form not found'
        })

         res.status(200).json({
            success: true,
            message: 'Form Fetched Successfully',
            data: formToFetch
        })

    }


    async deleteForm(req, res){
        const formId = req.params.id
        const formToFetch = await  FormService.fetchOne({_id: formId});

        if(!formToFetch) return res.status(404).json({
            success: false,
            message: 'Form not found'
        })

        const deletedForm = await FormService.delete(formId);

        return res.status(200).json({
            success: true,
            message: 'Form Deleted Successfully',
            data: deletedForm
        })

    }
}

module.exports = new FormController()