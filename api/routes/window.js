'use strict'

var express = require('express');
var WindowController = require('../controllers/window');
var multipart = require('connect-multiparty');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();
api.post('/register-window', md_auth.ensureAuth, WindowController.saveWindow);
api.get('/windows/:page?',md_auth.ensureAuth, WindowController.getWindows);
api.get('/window/:id', md_auth.ensureAuth, WindowController.getWindow);
api.put('/update-window/:id', md_auth.ensureAuth, WindowController.updateWindow);
api.delete('/delete-window/:id', md_auth.ensureAuth, WindowController.deleteWindow);

module.exports = api;
