'use strict'

var express = require('express');
var RolController = require('../controllers/rol');
var multipart = require('connect-multiparty');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();
api.post('/saveRol', RolController.saveRol);
api.get('/rols/:page?',RolController.getRols);
api.get('/rol/:id', md_auth.ensureAuth, RolController.getRol);

module.exports = api;
