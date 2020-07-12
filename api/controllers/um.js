'use strinct'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var Um = require('../models/um');

function saveUm(req, res) {
    var params = req.body;
    var um = new Um();
    um.code = params.code;
    um.name = params.name;
    um.active = true;
    Um.find({code: params.code},(err, umr) => {
            if (umr && umr.length > 0) {
                return res.status(200).send({success:false, message: 'La unidad de medida que intentas registrar ya existe.'})
            } else {
                um.save((err, data) => {
                    if (err) return res.status(500).send({message: 'Error al guardar la unidad de medida.'});
                    if (data) {
                        res.status(200).send({
                            success: true,
                            message: 'La unidad de medida fue registrada con éxito',
                            datos: data
                        });
                    } else {
                        res.status(404).send({message: 'No se ha registrada la unidad de medida'});
                    }
                });
            }
        }
    )
}

//-----------------------------------------------------------------------------------------------------//
//editar los datos del usuario
function updateUm(req, res) {
    var umId = req.params.id;
    var update = req.body;
    Um.find({code: update.code}, (err, umr) => {
        var um_isset = false;
        umr.forEach((p) => {
            if (p && p._id != umId)
                um_isset = true
        });
        if (um_isset) return res.status(200).send({
            success: false,
            message: 'La unidad de medida que intentas actualizar ya existe.'
        });
        Um.findByIdAndUpdate(umId, update, {new: true}, (err, datos) => {
            if (err) return res.status(500).send({success: false, message: 'Error en la peticion.'});
            if (!datos) return res.status(404).send({success: false, message: 'No se ha podido actualizar.'});
            return res.status(200).send({
                datos: datos,
                message: 'La unidad de medida fue actualizada con éxito',
                success: true
            });
        });
    })
}

function deleteUm(req, res) {
    var umId = req.params.id;
    Um.findOne({'_id': umId}).remove(err => {
        if (err)
            return res.status(500).send({success: false, message: 'Imposible borrar esta unidad de medida.'});
        return res.status(200).send({success: true, message: 'La unidad de medida ha sido borrado con éxito.'});
    })
}

function getUms(req, res) {
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    var itemsPerPage = 15;
    var query = null;
    if (req.query.active == 'true') {
        query = {active: true}
    }
    Um.find(query).sort('_id').paginate(page, itemsPerPage, (err, datos, total) => {
        if (err) return res.status(500).send({message: 'Error en la peticion'});
        if (!datos) return res.status(400).send({message: 'No hay unidad de medidas disponibles.'});
        return res.status(200).send({
            datos: datos,
            total,
            pages: Math.ceil(total / itemsPerPage)
        });
    });
}


function getUm(req, res) {
    var umId = req.params.id;
    Um.findById(umId, (err, datos) => {
        if (err)
            return res.status(500).send({message: 'Error en la petición'});
        if (!datos)
            return res.status(404).send({message: 'La unidad de medida no existe'});
        return res.status(200).send({
            datos: datos
        });
    });
}


module.exports = {
    saveUm,
    getUms,
    getUm,
    updateUm,
    deleteUm
}
