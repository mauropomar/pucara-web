'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UmSchema = Schema({
    code: String,
    name: String,
    active:Boolean
});

module.exports = mongoose.model('Um', UmSchema);