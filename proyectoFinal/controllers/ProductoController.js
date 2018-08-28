'use strict';
var models = require('./../models');
const uuidv4 = require('uuid/v4');

class ProductoController {
    guardarProducto(req, res, next) {
        var id = req.user.id;

        var Producto = models.producto;
        var Empresa = models.empresa;
        var Usuario = models.usuario;
        var idProduto = req.body.text_codPrincipalA;
        var codigo_principal= req.body.text_codPrincipalA

        Empresa.findOne({
            where: {
                id_usuario: id
            }
        }).then(function (empresa) {
            Producto.findOne({
                where: {
                    codigo_principal: codigo_principal
                }
            }).then(function (producto) {
                if (!producto) {
                    var valorUnitario = parseFloat(req.body.txt_valUnitario);
                    var iva = parseFloat(req.body.slt_ivaProductoNuevo);
                    var precioVenta = valorUnitario*iva;

                    precioVenta = valorUnitario + precioVenta;

                    console.log(precioVenta)
                    var data = {
                        modelo: req.body.txt_modProductoA,
                        nombre: req.body.txt_nomProductoA,
                        precio_unitario: valorUnitario,
                        iva: iva,
                        precio_venta: precioVenta,
                        stock: req.body.check_valUnitario,
                        marca: req.body.txt_marProductoA,
                        codigo_principal: req.body.text_codPrincipalA,
                        external_id: uuidv4(),
                        id_empresa: empresa.empresa_id
                    };
                    Producto.create(data).then(function (newProducto, data) {
                        if (newProducto) {
                            console.log("222222222222222222222");
                            console.log("productoCreadoConExito");
                            console.log("222222222222222222222");

                        } else {
                            console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrr");
                        };
                    });
                }


            });
        });
    };
};
module.exports = ProductoController;
