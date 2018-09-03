'use strict';
var models = require('./../models');
const uuidv4 = require('uuid/v4');
class UsuarioController {
    buscarUsuario(req, res, next) {
        var Usuario = models.usuario;

        Usuario.findOne({
            where: {
                usuario_id: req.user.id
            }
        }).then(function (usuario) {
            if (usuario) {
                console.log(usuario);
                res.send({
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email
                });
            }

        });
    }


    actualizarUsuario(req, res, next) {
        console.log("#$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        var Usuario = models.usuario;


        Usuario.update({
            nombre: req.body.nombre,
            apellido: req.body.apellido
        }, {
            where: {
                usuario_id: req.user.id
            }
        }).then(function (usuario) {
            if (usuario) {
                res.send({
                    data: usuario
                });
            }
            if (!usuario) {
                res.send({
                    data: null
                });
            }
        });



    };


}
module.exports = UsuarioController;
