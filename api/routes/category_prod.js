'use strict'

var express = require('express');
var CategoryController = require('../controllers/category_prod');
var multipart = require('connect-multiparty');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();
api.post('/register-category-prod', md_auth.ensureAuth, CategoryController.saveCategory);
api.get('/category-prods/:page?',md_auth.ensureAuth, CategoryController.getCategories);
api.get('/category-prod/:id', md_auth.ensureAuth, CategoryController.getCategory);
api.put('/update-category-prod/:id', md_auth.ensureAuth, CategoryController.updateCategory);
api.delete('/delete-category-prod/:id', md_auth.ensureAuth, CategoryController.deleteCategory);

module.exports = api;