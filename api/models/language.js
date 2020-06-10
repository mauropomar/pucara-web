'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LanguageSchema = Schema({
    identity: String,
    name: String,
    description: String,
    image:String,
    active:Boolean
});

module.exports = mongoose.model('Language', LanguageSchema);