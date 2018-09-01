'use strict';
var models = require('./../models');
const uuidv4 = require('uuid/v4');

class ProductoController {

    actualizar(req, res, next) {
        console.log("#$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        var Producto = models.producto;
        var valorUnitario = parseFloat(req.body.precio);
        var iva = parseFloat(req.body.iva);
        var precioVenta = valorUnitario * iva;

        console.log(req.body.iva);
        console.log(precioVenta);
        console.log(req.body.codPrincipal)
        console.log(req.body.precio);

        Producto.findOne({
            where:{
                cod_principal: req.body.codPrincipal
            }
        }).then(function (producto) {
            console.log("jkaldsfjlasjdfkljasdñlkfjasñldkfjañslkdjfñlaskjdflñkasjdf");
            if (producto) {
                Producto.update({
                    modelo: req.body.modeloActual,
                    nombre: req.body.nomProduct,
                    precio_unitario: valorUnitario,
                    iva: iva,
                    precio_venta: precioVenta,
                    stock: req.body.stock,
                    marca: req.body.marca,
                    codigo_principal: req.body.codPrincipal
                }, {
                    where: {
                        producto_id: producto.producto_id
                    }
                });
            }

        });
    };

    buscarProducto(req, res, next) {
        var Producto = models.producto;
        var codigo = req.body.text_codPrincipal;
        console.log(req.body.text_codPrincipal);

        console.log(codigo);

        Producto.findOne({
            where: {
                cod_principal: codigo
            }
        }).then(function (producto) {
            if (producto) {
                console.log(producto);
                res.send({
                    modelo: producto.modelo,
                    nombre: producto.nombre,
                    precio_unitario: producto.precio_unitario,
                    iva: producto.iva,
                    precio_venta: producto.precio_venta,
                    stock: producto.stock,
                    marca: producto.marca,
                    codigo_principal: producto.cod_principal
                });
            } else {
                console.log("erorrrrrrrrrrrrrr")
            }
        });

    }

    guardarProducto(req, res, next) {
        var id = req.user.id;

        var Producto = models.producto;
        var Empresa = models.empresa;
        var Usuario = models.usuario;
        var idProduto = req.body.text_codPrincipalA;
        var codigo_principal = req.body.text_codPrincipalA;

        Empresa.findOne({
            where: {
                id_usuario: id
            }
        }).then(function (empresa) {
            Producto.findOne({
                where: {
                    cod_principal: codigo_principal
                }
            }).then(function (producto) {
                if (!producto) {
                    var valorUnitario = parseFloat(req.body.txt_valUnitario);
                    var iva = parseFloat(req.body.slt_ivaProductoNuevo);
                    var precioVenta = valorUnitario * iva;

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
                        cod_principal: req.body.text_codPrincipalA,
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
