'use strict'

var express = require('express');
var CategoryController = require('../controllers/category_customer');
var multipart = require('connect-multiparty');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();
api.post('/register-category-customer', md_auth.ensureAuth, CategoryController.saveCategory);
api.get('/category-customers/:page?',md_auth.ensureAuth, CategoryController.getCategories);
api.get('/category-customer/:id', md_auth.ensureAuth, CategoryController.getCategory);
api.put('/update-category-customer/:id', md_auth.ensureAuth, CategoryController.updateCategory);
api.delete('/delete-category-customer/:id', md_auth.ensureAuth, CategoryController.deleteCategory);

module.exports = api;