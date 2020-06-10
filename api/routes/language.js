'use strict'

var express = require('express');
var Controller = require('../controllers/language');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/languages'});


var api = express.Router();
var md_auth = require('../middlewares/authenticated');
api.post('/register', Controller.saveLanguage);
api.get('/language/:id', md_auth.ensureAuth, Controller.getLanguage);
api.get('/languages/:page?', md_auth.ensureAuth, Controller.getLanguages);
api.put('/update-language/:id', md_auth.ensureAuth, Controller.updateLanguage);
api.post('/upload-image-language/:id', [md_auth.ensureAuth, md_upload], Controller.uploadImage);
api.get('/get-image-language/:imageFile',  Controller.getImageFile);
api.delete('/delete-language/:id', md_auth.ensureAuth, Controller.deleteLanguage);

module.exports = api;
