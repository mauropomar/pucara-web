'use strinct'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var Customer = require('../models/customer');
;

function saveCustomer(req, res) {
    var params = req.body;
    var customer = new Customer();

    customer.code = params.code;
    customer.name = params.name;
    customer.description = params.description;
    customer.credit = params.credit;
    customer.deactivationDate = params.deactivationDate;
    customer.deactivationReason = params.deactivationReason;
    customer.active = true;
    Customer.find({ code: params.code }, (err, data) => {
        if (err) return res.status(500).send({ mesage: 'Error en la petición de clientes.' });
        if (data && data.length > 1) {
            return res.status(200).send({ success: false, message: 'El cliente que intentas registrar ya existe.' })
        } else {
            customer.save((err, datos) => {
                if (err) return res.status(500).send({ message: 'Error al guardar la cliente.' });
                if (datos) {
                    res.status(200).send({
                        success: true,
                        message: 'El cliente fue registrado con éxito',
                        datos: datos
                    });
                } else {
                    res.status(404).send({ message: 'No se ha registrado el cliente' });
                }
            });
        }
    }
    )
}

//-----------------------------------------------------------------------------------------------------//
//editar los datos del usuario
function updateCustomer(req, res) {
    var cusId = req.params.id;
    var update = req.body;
    Customer.find({ code: update.code }, (err, cust) => {
        var cust_isset = false;
        cust.forEach((p) => {
            if (p && p._id != cusId)
                cust_isset = true
        });
        if (cust_isset) return res.status(200).send({
            success: false,
            message: 'El cliente que intentas actualizar ya existe.'
        });
        Customer.findByIdAndUpdate(cusId, update, { new: true }, (err, datos) => {
            if (err) return res.status(500).send({ success: false, message: 'Error en la peticion.' });
            if (!datos) return res.status(404).send({ success: false, message: 'No se ha podido actualizar.' });
            return res.status(200).send({
                pais: datos,
                message: 'El cliente fue actualizada con éxito',
                success: true
            });
        });
    })
}

function deleteCustomer(req, res) {
    var catId = req.params.id;
    Customer.findOne({ '_id': catId }).remove(err => {
        if (err)
            return res.status(500).send({ success: false, message: 'Imposible borrar este cliente.' });
        return res.status(200).send({ success: true, message: 'El cliente ha sido borrado con éxito.' });
    })
}

function getCustomers(req, res) {
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    var itemsPerPage = 10;
    var query = null;
    if (req.query.active == 'true') {
        query = { active: true }
    }
    Customer.find(query).sort('_id').paginate(page, itemsPerPage, (err, datos, total) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        if (!datos) return res.status(400).send({ message: 'No hay clientes disponibles.' });
        return res.status(200).send({
            datos: datos
        });
    });
}


function getCustomer(req, res) {
    var catId = req.params.id;
    Customer.findById(catId, (err, datos) => {
        if (err)
            return res.status(500).send({ message: 'Error en la petición' });
        if (!datos)
            return res.status(404).send({ message: 'El cliente no existe' });
        return res.status(200).send({
            datos: datos
        });
    });
}


module.exports = {
    saveCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
}