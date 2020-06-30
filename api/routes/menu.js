'use strict'

var express = require('express');
var Controller = require('../controllers/menu');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/menus'});


var api = express.Router();
var md_auth = require('../middlewares/authenticated');
api.post('/register-menu', Controller.saveMenu);
api.get('/menu/:id', md_auth.ensureAuth, Controller.getMenu);
api.get('/menus/:page?', md_auth.ensureAuth, Controller.getMenus);
api.put('/update-menu/:id', md_auth.ensureAuth, Controller.updateMenu);
api.post('/upload-image-menu/:id', [md_auth.ensureAuth, md_upload], Controller.uploadImage);
api.get('/get-image-menu/:imageFile',  Controller.getImageFile);
api.delete('/delete-menu/:id', md_auth.ensureAuth, Controller.deleteMenu);

module.exports = api;