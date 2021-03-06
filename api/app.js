'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

var app = express();
//cargar rutas
var user_routes = require('./routes/user');
var rol_routes = require('./routes/rol');
var category_prod_routes = require('./routes/category_prod');
var category_customer_routes = require('./routes/category_customer');
var language_routes = require('./routes/language');
var window_routes = require('./routes/window');
var brand_routes = require('./routes/brand');
var um_routes = require('./routes/um');
var menu_routes = require('./routes/menu');
var customer_routes = require('./routes/customer');
var product_routes = require('./routes/product');
var catalogue_routes = require('./routes/catalogue');

//middleware

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
app.use('/api', user_routes);
app.use('/api', rol_routes);
app.use('/api', category_prod_routes);
app.use('/api', category_customer_routes);
app.use('/api', language_routes);
app.use('/api', window_routes);
app.use('/api', brand_routes);
app.use('/api', um_routes);
app.use('/api', menu_routes);
app.use('/api', customer_routes);
app.use('/api', product_routes);
app.use('/api', catalogue_routes);


//exportar

module.exports = app;

