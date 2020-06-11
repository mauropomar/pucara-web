'use strinct'

var Language = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

var Language = require('../models/language');


function saveLanguage(req, res) {
    var params = req.body;
    var lan = new Language();
    lan.code = params.code;
    lan.name = params.name;
    lan.description = params.description;
    lan.active = params.active;
    lan.flag = null;
    Language.find({
        $or: [{code: lan.code},
            {name: lan.name}]
    }, (err, langs)  => {
            if (langs && langs.length > 0) {
                return res.status(200).send({success: false, message: 'El idioma que intentas registrar ya existe.'})
            } else {
                lan.save((err, datos) => {
                    if (err) return res.status(500).send({message: 'Error al guardar el idioma'});
                    if (datos) {
                        res.status(200).send({
                            datos: datos,
                            message: 'El idioma fue registrado con éxito',
                            success: true
                        });
                    } else {
                        res.status(404).send({message: 'No se ha registrado el idioma'});
                    }
                });
            }
    })
}


//-----------------------------------------------------------------------------------------------------//
//editar los datos del usuario
function updateLanguage(req, res) {
    var lanId = req.params.id;
    var update = req.body;
    Language.find({
        $or: [{code: update.code.toLowerCase()},
            {name: update.name.toLowerCase()}]
    }).exec((err, langs) => {
        var lang_isset = false;
        langs.forEach((lang) => {
            if (lang && lang._id != langId)
                lang_isset = true
        });
        if (lang_isset) return res.status(200).send({
            success: false,
            message: 'El idioma que intentas actualizar ya existe.'
        });
        Language.findByIdAndUpdate(lanId, update, {new: true}, (err, data) => {
            if (err) return res.status(500).send({success: false, message: 'Error en la peticion.'});
            if (!data) return res.status(404).send({
                success: false,
                message: 'No se ha podido actualizar.'
            });
            return res.status(200).send({
                datos: data,
                message: 'El idioma fue actualizado con éxito',
                success: true
            });
        });
    });
}


//metodo que devuelve un idioma determninado
//----------------------------------------Language---------------------------------------//
function getLanguage(req, res) {
    var lanId = req.params.id;
    Language.findById(lanId, (err, datos) => {
        if (err)
            return res.status(500).send({message: 'Error en la petición'});
        if (!datos)
            return res.status(404).send({message: 'El usuario no existe'});
        return res.status(200).send({datos: datos});
    });
}

//-----------------------------------Languages-------------------------------------------------//
//metodo que devuelve un listado de usuarios paginados
function getLanguages(req, res) {
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    var itemsPerPage = 10;
    var query = null;
    if (req.query.active == 'true') {
        query = {active: true}
    }
    Language.find(query).sort('_id').paginate(page, itemsPerPage, (err, datos, total) => {
        if (err) return res.status(500).send({message: 'Error en la peticion'});
        if (!datos) return res.status(400).send({message: 'No hay idiomas disponibles.'});
        return res.status(200).send({
            datos: datos,
            total: total,
            pages: Math.ceil(total / itemsPerPage)
        });
    });
}

//--------------------------------------Upload image----------------------------------------------//

function uploadImage(req, res) {
    var lanId = req.params.id;

    if (req.files) {
        var file_path = req.files.flag.path;

        var file_split = file_path.split('\\');
        //   console.log(file_split);
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        console.log(lanId);
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg') {
            Language.findByIdAndUpdate(lanId, {flag: file_name}, {new: true}, (err, datos) => {
                if (err) return res.status(500).send({message: 'Error en la peticion.'});
                if (!datos) return res.status(404).send({message: 'No se ha podido actualizar.'});
                return res.status(200).send({language: datos});
            })
        } else {
            return removeFilePathUploads(res, file_path, 'Extensión no válida.');
        }
    } else {
        return res.status(200).send({message: 'No se han subido imagenes.'});
    }
}

function getImageFile(req, res) {
    var image_file = req.params.imageFile;
    var path_file = './uploads/languages/' + image_file;
    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({message: 'No existe la imagen...'});
        }
    });
}

function removeFilePathUploads(res, filepath, message) {
    fs.unlink(filepath, (err) => {
        return res.status(200).send({message: message});
    })
}

function deleteLanguage(req, res) {
    var lanId = req.params.id;
    Language.findOne({'_id': lanId}).remove(err => {
        if (err)
            return res.status(500).send({success: false, message: 'Imposible borrar este idioma.'});
        return res.status(200).send({success: true, message: 'El idioma ha sido borrado con éxito.'});
    })
}

module.exports = {
    saveLanguage,
    getLanguage,
    getLanguages,
    updateLanguage,
    uploadImage,
    getImageFile,
    deleteLanguage
}
