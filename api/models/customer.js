'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = Schema({
    code:String,
    name: String,
    description: String,
    credit:Number,
    deactivationDate:Date,
    deactivationReason:String,
    active:Boolean
});

module.exports = mongoose.model('Customer', CustomerSchema);