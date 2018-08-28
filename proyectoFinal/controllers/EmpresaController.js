'use strict';
var models = require('./../models');
const uuidv4 = require('uuid/v4');
class EmpresaController {

    verListaWs(req, res, next) {
        //this.isLoggedIn(req, res, next);

        res.render('template/templateI', {
            title: 'Listado de peliculas por servicio web',
            login: true,
            fragmento: '../fragmentos/admin/peliculasws/listar',

        });
    }

    buscarExistenciaEmpresa(req, res, next) {
        var Empresa = models.empresa;
        var external_id = req.user.id;
        Empresa.findOne({
            where:{
                id_usuario:external_id
            }
        }).then(function(empresa){
            console.log(empresa)
            if(empresa){
               res.redirect('/app');
               }else{
                   res.redirect('/registrarEmpresa');
               }
        });
    }

    guardar(req, res, next) {
        var Usuario = models.usuario;
        var id = req.user.id;
        console.log(req.user.id + "   *************8");
        Usuario.findOne({
            where: {
                usuario_id:id
            }
        }).then(function (usuario) {
            if (usuario) {
                var data = {
                    ruc: req.body.txt_RUCEmp,
                    razon_social: req.body.txt_razonSocialEmp,
                    direc_matriz: req.body.txt_direccionMatEmp,
                    direc_sucursal: req.body.txt_direccionSucEmp,
                    telefono: req.body.txt_telefonoEmp,
                    id_usuario: id,
                    external_id: uuidv4()
                };
                var Empresa = models.empresa;
                Empresa.create(data).then(function (newEmpresa, created) {
                    if (newEmpresa) {
                        res.redirect('/app');
                    } else {
                        res.redirect('/app');
                    }
                });
            } else {
                res.redirect('/registrarEmpresa');
            }
        });
    }

    isLoggedIn(req, res, next) {
        if (!req.isAuthenticated())
            res.redirect('/inicio');
    }
}
module.exports = EmpresaController;
