'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BrandSchema = Schema({
    name: String,
    description: String,
    active:Boolean
});

module.exports = mongoose.model('Brand', BrandSchema);