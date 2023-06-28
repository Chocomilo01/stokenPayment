const express = require('express');
const router = express.Router();

const { Authorizer, authenticate }  = require('../middlewares/auth.middleware');
const formController = require('../controller/formController');


router.post('/', formController.createForm)
  router.get('/:id', formController.fetchOneForm)
 router.patch('/:id', formController.updateForm)
 router.get('/',authenticate,Authorizer, formController.fetchForms)
 router.delete('/:id', formController.deleteForm)



 module.exports = router;
