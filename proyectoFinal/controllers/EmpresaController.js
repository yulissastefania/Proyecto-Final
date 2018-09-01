'use strict';
var models = require('./../models');
const uuidv4 = require('uuid/v4');
class EmpresaController {

    buscarExistenciaEmpresa(req, res, next) {
        var Empresa = models.empresa;
        var external_id = req.user.id;
        
        console.log("345$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        console.log(external_id);
        
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
        console.log( "%$$$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*************8");
        console.log(req.user.ambiente);
        
        Usuario.findOne({
            where: {
                usuario_id:id
            }
        }).then(function (usuario) {
            if (usuario) {
                var data = {
                    ruc: req.body.txt_RUCEmp,
                    razon_social: req.body.txt_razonSocialEmp,
                    num_contribuyente:req.body.txt_num_contribuyente,
                    ambiente :req.body.txt_ambienteEmp,
                    obligado_contabilidad:req.body.txt_obligadoContabilidad,
                    direc_matriz:req.body.txt_direccionMatEmp,
                     direc_sucursal:req.body.txt_direccionSucEmp,
                    telefono:req.body.txt_telefonoEmp,
                    id_usuario: id,
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
        });
    }

    isLoggedIn(req, res, next) {
        if (!req.isAuthenticated())
            res.redirect('/inicio');
    }
}
module.exports = EmpresaController;
