'use strict';
var models = require('./../models');
const uuidv4 = require('uuid/v4');
class FacturaController {
    datosFactura(req, res, next) {
        var Factura = models.factura;
        Factura.findAll().then(function (factura) {
            console.log(factura.numero_factura);
            if (factura[factura.length - 1] == null) {
                res.send({
                    numero_factura: "00000000000000001",
                    numero_autorizacion: "0408201801179001691900120861070001126650446010318"
                });
            } else {
                var facturaNueva = Number(factura[factura.length - 1].numero_factura);
                facturaNueva += 1
                facturaNueva = facturaNueva.toString().split("");
                var auxNum = factura[factura.length - 1].numero_factura.toString().split("");
                var cont = 0;
                cont = (auxNum.length - 1) - (facturaNueva.length - 1);

                for (var i = cont, j = 0; i < auxNum.length; i++, j++) {
                    auxNum[i] = facturaNueva[j];

                }

                const n = 60;
                const arr = new Array(n);
                for (let i = 10; i < n; i++) {
                    arr[i] = i + 1;
                }
                arr.sort(() => Math.random() > 0.5 ? 1 : -1);
                const loteria = arr.slice(0, 21);
                res.send({
                    numero_factura: auxNum.toString().replace(/,/g, ""),
                    numero_autorizacion:loteria.toString().replace(/,/g,""),
                });


            }
        });
    }


    guardarFactura(req, res, next) {
        var Factura = models.factura;
        var Cliente = models.cliente;
        var detalle = req.body.detalle.split(",");
        console.log(detalle);



        Cliente.findOne({
            where: {
                cedula_ruc: req.body.id_cliente
            }
        }).then(function (cliente) {

            if (cliente) {

                var data = {
                    numero_factura: req.body.numero_factura,
                    numero_autorizacion: req.body.numero_autorizacion,
                    fecha_emision: req.body.fecha_emision,
                    fecha_hora_autorizacion: req.body.fecha_hora_autorizacion,
                    subtotal: req.body.subtotal,
                    IVA: req.body.IVA,
                    IVA_total: req.body.IVA_total,
                    valor_total: req.body.valor_total,
                    tipo_emision: req.body.tipo_emision,
                    id_cliente: cliente.cliente_id,
                    external_id: uuidv4()
                }
                var Factura = models.factura;
                Factura.create(data).then(function (newFactura, created) {
                    if (newFactura) {
                        var Producto = models.producto;
                        for (var i = 0, j = 3; i < detalle.length; i += 4, j += 3) {

                            Producto.findOne({
                                where: {
                                    cod_principal: detalle[j]
                                }
                            }).then(function (producto) {
                                if (producto) {
                                    var dataDetalle = {
                                        cantidad: detalle[0],
                                        precio_unitario: detalle[1],
                                        precio_total: detalle[2],
                                        external_id: uuidv4(),
                                        id_factura: newFactura.factura_id,
                                        id_producto: producto.producto_id
                                    }
                                    var Detalle = models.detalle_factura;
                                    Detalle.create(dataDetalle).then(function (newDetalle, created) {
                                        if (newDetalle) {
                                            res.send({
                                                data:true
                                            })
                                        }
                                    })

                                }
                            });

                        }
                    }
                });


            }


        });

        /*

                Factura.findOne({
                    where: {
                        numero_factura: numFactura
                    }
                }).then(function (factura) {
                    if (!factura) {
                        var data = {
                            numero_factura
                            numero_autorizacion
                            fecha_emision
                            fecha_hora_autorizacion
                            subtotal
                            IVA
                            IVA_total
                            valor_total
                            tipo_emision
                            id_cliente



                            external_id: uuidv4()
                        };
                        var Empresa = models.empresa;
                        Empresa.create(data).then(function (newEmpresa, created) {
                            if (newEmpresa) {
                                console.log(newEmpresa);
                                res.redirect('/app');
                            } else {
                                res.redirect('/registrarEmpresa');
                            }
                        });
                    } else {
                        res.redirect('/registrarEmpresa');
                    }
                });*/
    }

    isLoggedIn(req, res, next) {
        if (!req.isAuthenticated())
            res.redirect('/inicio');
    }
}
module.exports = FacturaController;
