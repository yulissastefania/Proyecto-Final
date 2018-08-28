'use strict';
const uuidv4 = require('uuid/v4');
var bCrypt = require('bcrypt-nodejs');

class AutentificacionControllers {
    ingresoUser(req, res) {
        res.render('fragmentos/frm_registrarEmpresa');
    }
    signin(req, res) {
        res.render('templates/login');
    }
    home(req,res){
        res.render('templates/index');
    }

}
module.exports = AutentificacionControllers;
