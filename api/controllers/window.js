'use strinct'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var Window = require('../models/window');

function saveWindow(req, res) {
    var params = req.body;
    var windowe = new Window();
    windowe.name = params.name;
    windowe.active = true;
    Window.find({name: params.name},(err, window) => {
            if (window && window.length > 0) {
                return res.status(200).send({success:false, message: 'El window que intentas registrar ya existe.'})
            } else {
                windowe.save((err, windoweStore) => {
                    if (err) return res.status(500).send({message: 'Error al guardar el window.'});
                    if (windoweStore) {
                        res.status(200).send({
                            success: true,
                            message: 'El window fue registrado con éxito',
                            datos: windoweStore
                        });
                    } else {
                        res.status(404).send({message: 'No se ha registrado el window'});
                    }
                });
            }
        }
    )
}

//-----------------------------------------------------------------------------------------------------//
//editar los datos del usuario
function updateWindow(req, res) {
    var windowId = req.params.id;
    var update = req.body;
    Window.find({name: update.name}, (err, window) => {
        var window_isset = false;
        window.forEach((p) => {
            if (p && p._id != windowId)
                window_isset = true
        });
        if (window_isset) return res.status(200).send({
            success: false,
            message: 'El window que intentas actualizar ya existe.'
        });
        Window.findByIdAndUpdate(windowId, update, {new: true}, (err, datos) => {
            if (err) return res.status(500).send({success: false, message: 'Error en la peticion.'});
            if (!datos) return res.status(404).send({success: false, message: 'No se ha podido actualizar.'});
            return res.status(200).send({
                pais: datos,
                message: 'El window fue actualizada con éxito',
                success: true
            });
        });
    })
}

function deleteWindow(req, res) {
    var windowId = req.params.id;
    Window.findOne({'_id': windowId}).remove(err => {
        if (err)
            return res.status(500).send({success: false, message: 'Imposible borrar este window.'});
        return res.status(200).send({success: true, message: 'El window ha sido borrado con éxito.'});
    })
}

function getWindows(req, res) {
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    var itemsPerPage = 10;
    var query = null;
    if (req.query.active == 'true') {
        query = {active: true}
    }
    Window.find(query).sort('_id').paginate(page, itemsPerPage, (err, datos, total) => {
        if (err) return res.status(500).send({message: 'Error en la peticion'});
        if (!datos) return res.status(400).send({message: 'No hay windowes disponibles.'});
        return res.status(200).send({
            datos: datos
        });
    });
}


function getWindow(req, res) {
    var windowId = req.params.id;
    Window.findById(windowId, (err, datos) => {
        if (err)
            return res.status(500).send({message: 'Error en la petición'});
        if (!datos)
            return res.status(404).send({message: 'El usuario no existe'});
        return res.status(200).send({
            datos: datos
        });
    });
}


module.exports = {
    saveWindow,
    getWindows,
    getWindow,
    updateWindow,
    deleteWindow
}
