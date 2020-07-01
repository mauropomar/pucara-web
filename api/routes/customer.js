'use strict'

var express = require('express');
var CustomerController = require('../controllers/customer');
var multipart = require('connect-multiparty');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();
api.post('/register-customer', md_auth.ensureAuth, CustomerController.saveCustomer);
api.get('/customers/:page?',md_auth.ensureAuth, CustomerController.getCustomers);
api.get('/customer/:id', md_auth.ensureAuth, CustomerController.getCustomer);
api.put('/update-customer/:id', md_auth.ensureAuth, CustomerController.updateCustomer);
api.delete('/delete-customer/:id', md_auth.ensureAuth, CustomerController.deleteCustomer);

module.exports = api;