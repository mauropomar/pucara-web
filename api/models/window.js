'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WindowSchema = Schema({
    name: String,
    active:Boolean
});

module.exports = mongoose.model('Window', WindowSchema);