var Product = require('../models/product');


function getProducts(req, res) {
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    var itemsPerPage = 12;
    Product.find({active:true}).sort('_id').paginate(page, itemsPerPage, (err, datos, total) => {
        if (err) return res.status(500).send({message: 'Error en la peticion'});
        if (!datos) return res.status(400).send({message: 'No hay productos disponibles.'});
        return res.status(200).send({
            datos: datos,
            total: total,
            pages: Math.ceil(total / itemsPerPage)
        });
    });
}


module.exports = {
    getProducts
}