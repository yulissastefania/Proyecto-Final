var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* get login*/
router.get('/loginFinal', function(req, res, next) {
  res.render('templates/login');
});

/*get app*/
router.get('/app', function(req, res, next) {
  res.render('templates/app',{factura:'../fragmentos/frm_factura',ingresarProductos:'../fragmentos/frm_ingresoProductos', buscarProductos:'../fragmentos/frm_buscarProductos',nuevoCliente:'../fragmentos/frm_nuevoCliente'});
});

//Pagina de inicio
router.get('/home', function(req, res, next) {
    res.render('templates/index');
});

//Perfil de usuario
router.get('/profile', function(req, res, next) {
    res.render('profile');
});

//Editar Usuario
router.get('/editar', function(req, res, next) {
    res.render('edit_profile');
});

/* registrar Usuario*/
router.get('/registrarUsuario', function(req, res, next) {
  res.render('fragmentos/frm_registrarUsuario');
});

/* registrar Empresa*/
router.get('/registrarEmpresa', function(req, res, next) {
  res.render('fragmentos/frm_registrarEmpresa');
});

module.exports = router;
