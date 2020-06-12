'use strict'

var express = require('express');
var UmController = require('../controllers/um');
var multipart = require('connect-multiparty');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();
api.post('/register-um', md_auth.ensureAuth, UmController.saveUm);
api.get('/ums/:page?',md_auth.ensureAuth, UmController.getUms);
api.get('/um/:id', md_auth.ensureAuth, UmController.getUm);
api.put('/update-um/:id', md_auth.ensureAuth, UmController.updateUm);
api.delete('/delete-um/:id', md_auth.ensureAuth, UmController.deleteUm);

module.exports = api;
