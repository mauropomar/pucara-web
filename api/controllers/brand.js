'use strinct'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var Brand = require('../models/brand');

function saveBrand(req, res) {
    var params = req.body;
    var brand = new Brand();
    brand.name = params.name;
    brand.description = params.description;
    brand.active = true;
    Brand.find({name: params.name},(err, brands) => {
            if (brands && brands.length > 0) {
                return res.status(200).send({success:false, message: 'La marca que intentas registrar ya existe.'})
            } else {
                brand.save((err, brandStore) => {
                    if (err) return res.status(500).send({message: 'Error al guardar la marca.'});
                    if (brandStore) {
                        res.status(200).send({
                            success: true,
                            message: 'La marca fue registrada con éxito',
                            datos: brandStore
                        });
                    } else {
                        res.status(404).send({message: 'No se ha registrado marca'});
                    }
                });
            }
        }
    )
}

//-----------------------------------------------------------------------------------------------------//
//editar los datos del usuario
function updateBrand(req, res) {
    var brandId = req.params.id;
    var update = req.body;
    Brand.find({name: update.name}, (err, brand) => {
        var brand_isset = false;
        brand.forEach((p) => {
            if (p && p._id != brandId)
                brand_isset = true
        });
        if (brand_isset) return res.status(200).send({
            success: false,
            message: 'La marca que intentas actualizar ya existe.'
        });
        Brand.findByIdAndUpdate(brandId, update, {new: true}, (err, datos) => {
            if (err) return res.status(500).send({success: false, message: 'Error en la peticion.'});
            if (!datos) return res.status(404).send({success: false, message: 'No se ha podido actualizar.'});
            return res.status(200).send({
                pais: datos,
                message: 'La marca fue actualizada con éxito',
                success: true
            });
        });
    })
}

function deleteBrand(req, res) {
    var brandId = req.params.id;
    Brand.findOne({'_id': brandId}).remove(err => {
        if (err)
            return res.status(500).send({success: false, message: 'Imposible borrar esta marca.'});
        return res.status(200).send({success: true, message: 'La marca ha sido borrado con éxito.'});
    })
}

function getBrands(req, res) {
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    var itemsPerPage = 10;
    var query = null;
    if (req.query.active == 'true') {
        query = {active: true}
    }
    Brand.find(query).sort('_id').paginate(page, itemsPerPage, (err, datos, total) => {
        if (err) return res.status(500).send({message: 'Error en la peticion'});
        if (!datos) return res.status(400).send({message: 'No hay marcas disponibles.'});
        return res.status(200).send({
            datos: datos
        });
    });
}


function getBrand(req, res) {
    var brandId = req.params.id;
    Brand.findById(brandId, (err, datos) => {
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
    saveBrand,
    getBrands,
    getBrand,
    updateBrand,
    deleteBrand
}
