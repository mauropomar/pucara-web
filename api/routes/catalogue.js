'use strict'

var express = require('express');
var Controller = require('../controllers/catalogue');
var multipart = require('connect-multiparty');


var api = express.Router();
var md_auth = require('../middlewares/authenticated');
api.get('/catalogues/:page?', md_auth.ensureAuth, Controller.getProducts);

module.exports = api;