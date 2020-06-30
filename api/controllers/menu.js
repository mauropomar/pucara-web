'use strinct'

var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var Menu = require('../models/menu');

function saveMenu(req, res) {
    var params = req.body;
    var menu = new Menu();
    menu.language = params.language;
    menu.name = params.name;
    menu.description = params.description;
    menu.active = true;
    Menu.find({language:params.language, name: params.name},(err, menur) => {
            if (menur && menur.length > 0) {
                return res.status(200).send({success:false, message: 'El menú que intentas registrar ya existe.'})
            } else {
                menu.save((err, data) => {
                    if (err) return res.status(500).send({message: 'Error al guardar el menú.'});
                    if (data) {
                        res.status(200).send({
                            success: true,
                            message: 'El menú fue registrado con éxito.',
                            datos: data
                        });
                    } else {
                        res.status(404).send({message: 'No se ha registrada el menú.'});
                    }
                });
            }
        }
    )
}

//-----------------------------------------------------------------------------------------------------//
//editar los datos del menu
function updateMenu(req, res) {
    var menuId = req.params.id;
    var update = req.body;
    Menu.find({language:update.language, name: update.name}, (err, menur) => {
        var menu_isset = false;
        menur.forEach((p) => {
            if (p && p._id != menuId)
                menu_isset = true
        });
        if (menu_isset) return res.status(200).send({
            success: false,
            message: 'El menú que intentas actualizar ya existe.'
        });
        Menu.findByIdAndUpdate(menuId, update, {new: true}, (err, datos) => {
            if (err) return res.status(500).send({success: false, message: 'Error en la peticion.'});
            if (!datos) return res.status(404).send({success: false, message: 'No se ha podido actualizar.'});
            return res.status(200).send({
                datos: datos,
                message: 'El menú fue actualizado con éxito',
                success: true
            });
        });
    })
}

function deleteMenu(req, res) {
    var menuId = req.params.id;
    Menu.findOne({'_id': menuId}).remove(err => {
        if (err)
            return res.status(500).send({success: false, message: 'Imposible borrar este menú.'});
        return res.status(200).send({success: true, message: 'El menú ha sido borrado con éxito.'});
    })
}

function getMenus(req, res) {
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    var itemsPerPage = 10;
    var queryCond = {};
    queryCond.language = req.query.languageId;
    if (req.query.active == 'true') {
        queryCond.active = req.query.active;
    }
    Menu.find(queryCond).sort('_id').paginate(page, itemsPerPage, (err, datos, total) => {
        if (err) return res.status(500).send({message: 'Error en la peticion'});
        if (!datos) return res.status(400).send({message: 'No hay menus disponibles.'});
        return res.status(200).send({
            datos: datos
        });
    });
}


function getMenu(req, res) {
    var menuId = req.params.id;
    Menu.findById(menuId, (err, datos) => {
        if (err)
            return res.status(500).send({message: 'Error en la petición'});
        if (!datos)
            return res.status(404).send({message: 'El menú no existe'});
        return res.status(200).send({
            datos: datos
        });
    });
}

//--------------------------------------Upload image----------------------------------------------//

function uploadImage(req, res) {
    var menuId = req.params.id;
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg') {
            Menu.findByIdAndUpdate(menuId, {image: file_name}, {new: true}, (err, datos) => {
                if (err) return res.status(500).send({message: 'Error en la peticion.'});
                if (!datos) return res.status(404).send({message: 'No se ha podido actualizar.'});
                return res.status(200).send({menu: datos});
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
    var path_file = './uploads/menus/' + image_file;
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


module.exports = {
    saveMenu,
    getMenus,
    getMenu,
    updateMenu,
    deleteMenu,
    uploadImage,
    getImageFile
}
