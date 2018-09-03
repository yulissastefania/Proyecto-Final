'use strict';
var models = require('./../models');
const uuidv4 = require('uuid/v4');

class ProductoController {

    eliminarProducto(req, res, next) {
        var Producto = models.producto;
        console.log("######################################################################33");
        console.log(req.body.codPrincipal);
        Producto.destroy({
            where: {
                cod_principal: req.body.codPrincipal
            }
        }).then(function (producto) {
            if (producto) {
                res.send({
                    data: producto
                });
            }
            if (!producto) {
                res.send({
                    data: null
                })
            }

        });
    };

    actualizar(req, res, next) {
        console.log("#$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        var Producto = models.producto;
        var valorUnitario = parseFloat(req.body.precio).toFixed(2);
        var iva = 0.12;
        var precioIvaFinal = valorUnitario * iva;
        var precioVenta = ((Number(valorUnitario).toFixed(2) * 1) + (Number(precioIvaFinal).toFixed(2) * 1));


        console.log(precioVenta);
        console.log(req.body.codPrincipal)
        console.log(req.body.precio);

        Producto.findOne({
            where: {
                cod_principal: req.body.codPrincipal
            }
        }).then(function (producto) {

            if (producto) {
                Producto.update({
                    modelo: req.body.modeloActual,
                    nombre: req.body.nomProduct,
                    precio_unitario: valorUnitario,
                    iva: iva,
                    precio_venta: precioVenta,
                    marca: req.body.marca,
                    codigo_principal: req.body.codPrincipal
                }, {
                    where: {
                        producto_id: producto.producto_id
                    }
                }).then(function(producto){
                    if(producto){
                       res.send({
                           data:producto
                           });
                       }
                    if(!producto){
                       res.send({
                           data:null
                       });
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
                    var valorUnitario = parseFloat(req.body.txt_valUnitario).toFixed(2);

                    var iva = 0.12;
                    var precioIvaFinal = valorUnitario * iva;
                    var precioVenta = ((Number(valorUnitario).toFixed(2) * 1) + (Number(precioIvaFinal).toFixed(2) * 1));

                    console.log(valorUnitario);
                    console.log(iva);
                    console.log(precioIvaFinal);
                    console.log(precioVenta);
                    var data = {
                        modelo: req.body.txt_modProductoA,
                        nombre: req.body.txt_nomProductoA,
                        precio_unitario: valorUnitario,
                        IVA: precioIvaFinal,
                        precio_venta: precioVenta,
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
                            res.send({
                                data: newProducto
                            });

                        } else {
                            res.send({
                                data: null
                            });
                            console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrr");
                        };
                    });
                }


            });
        });
    };
};
module.exports = ProductoController;
