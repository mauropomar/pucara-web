'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LanguageSchema = Schema({
    code: String,
    name: String,
    description: String,
    flag:String,
    active:Boolean
});

module.exports = mongoose.model('Language', LanguageSchema);