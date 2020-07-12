'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    username: String,
    email: String,
    phone: String,
    adreess: String,
    password: String,
    rol: {type: Schema.ObjectId, ref: 'Rol'},
    image: String,
    active:Boolean
});

module.exports = mongoose.model('User', UserSchema);
