'use strict'

var express = require('express');
var Controller = require('../controllers/product');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/products'});


var api = express.Router();
var md_auth = require('../middlewares/authenticated');
api.post('/register-product', Controller.saveProduct);
api.get('/product/:id', md_auth.ensureAuth, Controller.getProduct);
api.get('/products/:page?', md_auth.ensureAuth, Controller.getProducts);
api.put('/update-product/:id', md_auth.ensureAuth, Controller.updateProduct);
api.post('/upload-image-product/:id', [md_auth.ensureAuth, md_upload], Controller.uploadImage);
api.get('/get-image-product/:imageFile',  Controller.getImageFile);
api.delete('/delete-product/:id', md_auth.ensureAuth, Controller.deleteProduct);

module.exports = api;