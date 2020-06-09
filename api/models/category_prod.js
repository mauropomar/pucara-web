'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoryProdSchema = Schema({
    name: String,
    description: String,
    active:Boolean
});

module.exports = mongoose.model('CategoryProd', CategoryProdSchema);