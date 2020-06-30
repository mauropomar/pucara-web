'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MenuSchema = Schema({   
    name: String,
    description:String,
    image:String,
    language: {type: Schema.ObjectId, ref: 'Language'},
    active:Boolean
});

module.exports = mongoose.model('Menu', MenuSchema);