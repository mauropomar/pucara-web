'use strict'

var express = require('express');
var RolController = require('../controllers/rol');
var multipart = require('connect-multiparty');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();
api.post('/saveRol', md_auth.ensureAuth, RolController.saveRol);
api.get('/rols/:page?',RolController.getRols);
api.get('/rol/:id', md_auth.ensureAuth, RolController.getRol);
api.put('/update-rol/:id', md_auth.ensureAuth, RolController.updateRol);
api.delete('/delete-rol/:id', md_auth.ensureAuth, RolController.deleteRol);

module.exports = api;
