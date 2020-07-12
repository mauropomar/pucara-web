'use strinct'

var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

var Product = require('../models/product');


function saveProduct(req, res) {
    var params = req.body;
    var prod = new Product();
    prod.code = params.code;
    prod.name = params.name;
    prod.brand = params.brand;
    prod.uom = params.uom;
    prod.price = params.price;
    prod.discount = params.discount;
    prod.duodate = params.duodate;
    prod.recomended = params.recomended;
    prod.mostused = params.mostused;
    prod.description = params.description;
    prod.volume = params.volume;
    prod.weight = params.weight;
    prod.minstock = params.minstock;
    prod.tarifa = params.tarifa;
    prod.available = params.available;
    prod.maxwidth = params.maxwidth;
    prod.minheight = params.minheight;
    prod.maxlenght = params.maxlenght;
    prod.caracterist = params.caracterist;
    prod.active = params.active;
    prod.image = null;
    Product.find({
        $or: [{code: prod.code},
            {name: prod.name}]
    }, (err, prods)  => {
            if (prods && prods.length > 0) {
                return res.status(200).send({success: false, message: 'El producto que intentas registrar ya existe.'})
            } else {
                prod.save((err, datos) => {
                    if (err) return res.status(500).send({message: 'Error al guardar el producto'});
                    if (datos) {
                        res.status(200).send({
                            datos: datos,
                            message: 'El producto fue registrado con éxito',
                            success: true
                        });
                    } else {
                        res.status(404).send({message: 'No se ha registrado el producto'});
                    }
                });
            }
    })
}


//-----------------------------------------------------------------------------------------------------//
//editar los datos del usuario
function updateProduct(req, res) {
    var prodId = req.params.id;
    var update = req.body;
    Product.find({
        $or: [{code: update.code.toLowerCase()},
            {name: update.name.toLowerCase()}]
    }).exec((err, prods) => {
        var prod_isset = false;
        prods.forEach((p) => {
            if (p && p._id != prodId)
                prod_isset = true
        });
        if (prod_isset) return res.status(200).send({
            success: false,
            message: 'El producto que intentas actualizar ya existe.'
        });
        Product.findByIdAndUpdate(prodId, update, {new: true}, (err, data) => {
            if (err) return res.status(500).send({success: false, message: 'Error en la peticion.'});
            if (!data) return res.status(404).send({
                success: false,
                message: 'No se ha podido actualizar.'
            });
            return res.status(200).send({
                datos: data,
                message: 'El producto fue actualizado con éxito',
                success: true
            });
        });
    });
}


//metodo que devuelve un idioma determninado
//----------------------------------------Product---------------------------------------//
function getProduct(req, res) {
    var prodId = req.params.id;
    Product.findById(prodId, (err, datos) => {
        if (err)
            return res.status(500).send({message: 'Error en la petición'});
        if (!datos)
            return res.status(404).send({message: 'El producto no existe'});
        return res.status(200).send({datos: datos});
    });
}

//-----------------------------------Products-------------------------------------------------//
//metodo que devuelve un listado de usuarios paginados
function getProducts(req, res) {
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    var itemsPerPage = 20;
    var query = null;
    if (req.query.active == 'true') {
        query = {active: true}
    }
    Product.find(query).sort('_id').paginate(page, itemsPerPage, (err, datos, total) => {
        if (err) return res.status(500).send({message: 'Error en la peticion'});
        if (!datos) return res.status(400).send({message: 'No hay productos disponibles.'});
        return res.status(200).send({
            datos: datos,
            total: total,
            pages: Math.ceil(total / itemsPerPage)
        });
    });
}

//--------------------------------------Upload image----------------------------------------------//

function uploadImage(req, res) {
    var prodId = req.params.id;

    if (req.files) {
        var file_path = req.files.image.path;

        var file_split = file_path.split('\\');
        //   console.log(file_split);
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg') {
            Product.findByIdAndUpdate(prodId, {image: file_name}, {new: true}, (err, datos) => {
                if (err) return res.status(500).send({message: 'Error en la peticion.'});
                if (!datos) return res.status(404).send({message: 'No se ha podido actualizar.'});
                return res.status(200).send({datos: datos});
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
    var path_file = './uploads/products/' + image_file;
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

function deleteProduct(req, res) {
    var prodId = req.params.id;
    Product.findOne({'_id': prodId}).remove(err => {
        if (err)
            return res.status(500).send({success: false, message: 'Imposible borrar este producto.'});
        return res.status(200).send({success: true, message: 'El producto ha sido borrado con éxito.'});
    })
}

module.exports = {
    saveProduct,
    getProduct,
    getProducts,
    updateProduct,
    uploadImage,
    getImageFile,
    deleteProduct
}
