'use strict'

var express = require('express');
var BrandController = require('../controllers/brand');
var multipart = require('connect-multiparty');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();
api.post('/register-brand', md_auth.ensureAuth, BrandController.saveBrand);
api.get('/brands/:page?',md_auth.ensureAuth, BrandController.getBrands);
api.get('/brand/:id', md_auth.ensureAuth, BrandController.getBrand);
api.put('/update-brand/:id', md_auth.ensureAuth, BrandController.updateBrand);
api.delete('/delete-brand/:id', md_auth.ensureAuth, BrandController.deleteBrand);

module.exports = api;
