'use strinct'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var Category = require('../models/category_prod');
;

function saveCategory(req, res) {
    var params = req.body;
    var category = new Category();
    category.name = params.name + '';
    category.description = params.description;
    category.active = true;
    Category.find({name:category.name}).exec((err, data) => {
            if (err) return res.status(500).send({mesage: 'Error en la petición de categorias.'});
             if (data && data.length > 1) {
                return res.status(200).send({success:false, message: 'La categoría que intentas registrar ya existe.'})
            } else {
                category.save((err, datos) => {
                    if (err) return res.status(500).send({message: 'Error al guardar la categoría.'});
                    if (datos) {
                        res.status(200).send({
                            success: true,
                            message: 'La categoría fue registrada con éxito',
                            datos: datos
                        });
                    } else {
                        res.status(404).send({message: 'No se ha registrado la categoria'});
                    }
                });
            }
        }
    )
}

//-----------------------------------------------------------------------------------------------------//
//editar los datos del usuario
function updateCategory(req, res) {
    var catId = req.params.id;
    var update = req.body;
    Category.find({name: update.name.toLowerCase()}, (err, cat) => {
        var cat_isset = false;
        cat.forEach((p) => {
            if (p && p._id != catId)
                cat_isset = true
        });
        if (cat_isset) return res.status(200).send({
            success: false,
            message: 'La categoría que intentas actualizar ya existe.'
        });
        Category.findByIdAndUpdate(catId, update, {new: true}, (err, datos) => {
            if (err) return res.status(500).send({success: false, message: 'Error en la peticion.'});
            if (!datos) return res.status(404).send({success: false, message: 'No se ha podido actualizar.'});
            return res.status(200).send({
                pais: datos,
                message: 'La categoría fue actualizada con éxito',
                success: true
            });
        });
    })
}

function deleteCategory(req, res) {
    var catId = req.params.id;
   Category.findOne({'_id': catId}).remove(err => {
        if (err)
            return res.status(500).send({success: false, message: 'Imposible borrar esta categoría.'});
        return res.status(200).send({success: true, message: 'La categoría ha sido borrado con éxito.'});
    })
}

function getCategories(req, res) {
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    var itemsPerPage = 10;
    Category.find({active: true}).sort('_id').paginate(page, itemsPerPage, (err, datos, total) => {
        if (err) return res.status(500).send({message: 'Error en la peticion'});
        if (!datos) return res.status(400).send({message: 'No hay categorias disponibles.'});
        return res.status(200).send({
            datos: datos
        });
    });
}


function getCategory(req, res) {
    var catId = req.params.id;
    Category.findById(catId, (err, datos) => {
        if (err)
            return res.status(500).send({message: 'Error en la petición'});
        if (!datos)
            return res.status(404).send({message: 'La categoría no existe'});
        return res.status(200).send({
            datos: datos
        });
    });
}


module.exports = {
    saveCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}
