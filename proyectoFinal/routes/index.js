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
router.get('/home', (req, res, nexr) => {
    res.render('templates/index');
});

module.exports = router;
