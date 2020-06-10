'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoryCustomerSchema = Schema({
    name: String,
    description: String,
    active:Boolean
});

module.exports = mongoose.model('CategoryCustomer', CategoryCustomerSchema);