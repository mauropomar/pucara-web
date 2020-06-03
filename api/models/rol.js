'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RolSchema = Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Rol', RolSchema);