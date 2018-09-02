'use strict';
var models = require('./../models');
const uuidv4 = require('uuid/v4');
class ClienteController {
    buscarCliente(req, res, next) {
        var Cliente = models.cliente;
        console.log(req.body.cedulaRuc);
        Cliente.findOne({
            where: {
                cedula_ruc: req.body.cedulaRuc
            }
        }).then(function (cliente) {
            if (cliente) {
                console.log(cliente);
                res.send({
                    cedula_ruc: cliente.cedula_ruc,
                    razon_social: cliente.razon_social,
                    nombre: cliente.nombre,
                    apellido: cliente.apellido,
                    email: cliente.email,
                    direccion: cliente.direccion,
                    telefono: cliente.telefono
                });
            } 
            if(!cliente){
                res.send({
                    data:null
                });
            }
        });
    }

    guardarCliente(req, res, next) {
        var Cliente = models.cliente;
        var email = req.body.email;
        console.log("asdfasdfasdfasdfasdf");
        console.log(req.body.cedulaRuc);

        Cliente.findOne({
            where: {
                cedula_ruc: req.body.cedulaRuc
            }
        }).then(function (cliente) {

            if (!cliente) {

                var data = {
                    cedula_ruc: req.body.cedulaRuc,
                    razon_social: req.body.razonSocial,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    direccion: req.body.direccion,
                    telefono: req.body.telefono,
                    external_id: uuidv4()

                };
                Cliente.create(data).then(function (newCliente, data) {
                    if (newCliente) {
                        console.log("222222222222222222222");
                        console.log("clienteCreadoConExito");
                        console.log("222222222222222222222");
                        res.send({
                            data: newCliente
                        });

                    } else {
                        console.log("errorrrrrr34354rrrrrrrrrrrrrrrrrrrr");
                        res.send({
                            data: null
                        });
                    };
                });
            }
            if (cliente) {
                res.send({
                    data: null
                });
            }
        });
    };


}
module.exports = ClienteController;
