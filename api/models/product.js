'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({   
    code:String,
    name: String,
    brand: {type: Schema.ObjectId, ref: 'Brand'},
    uom:String,
    price:Number,
    discount:Number,
    description:String,
    duodate:Date,
    recomended:Boolean,
    mostused:Boolean,
    description:String,
    volume:Number,
    weight:Number,
    minstock:Number,
    tarifa:String,
    available:Number,
    maxwidth:Number,
    minheight:Number,
    maxlenght:Number,
    caracterist:String,
    image:String,
    active:Boolean
});

module.exports = mongoose.model('Product', ProductSchema);