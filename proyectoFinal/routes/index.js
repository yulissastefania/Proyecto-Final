var express = require('express');
var router = express.Router();
var autentification = require('../controllers/AutentificacionControllers');
var authController = new autentification();

/*controlador empresa*/
var empresa = require('../controllers/EmpresaController');
var empresaController= new empresa();

/*controlador producto*/

var producto = require('../controllers/ProductoController');
var productoController= new producto();

/*controlador cliente*/
var cliente = require('../controllers/ClienteController');
var clienteController= new cliente();

/*controlador factura*/
var factura = require('../controllers/FacturaController');
var facturaController= new factura();

/*controlador usuario*/
var usuario = require('../controllers/UsuarioController');
var usuarioController= new usuario();

var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/registro', passport.authenticate('local-singup', {
    successRedirect: '/loginFinal1',
    failureRedirect: '/home'
}));

/* get login*/
router.get('/loginFinal1', authController.signin);

router.post('/loginFinal', passport.authenticate('local-signin', {
    successRedirect: '/buscarExistenciaEmpresa',
    failureRedirect: '/loginFinal1'
}));

/*get app*/
router.get('/app', function (req, res, next) {
    res.render('templates/app', {
        nombre:req.user.name ,
        factura: '../fragmentos/frm_factura',
        ingresarProductos: '../fragmentos/frm_ingresoProductos',
        buscarProductos: '../fragmentos/frm_buscarProductos',
        nuevoCliente: '../fragmentos/frm_nuevoCliente'

    });
});

//Pagina de inicio

router.get('/home', authController.home);

//Perfil de usuario
router.get('/profile', function (req, res, next) {
    res.render('profile',{
        nombre:req.user.name
    });
});

//Editar Usuario
router.get('/editar', function (req, res, next) {
    res.render('edit_profile',{
        nombre:req.user.name
    });
});

/* registrar Usuario*/
router.get('/registrarUsuario', function (req, res, next) {
    res.render('fragmentos/frm_registrarUsuario');
});

/* registrar Empresa*/
router.get('/registrarEmpresa', function (req, res, next) {

    if (req.isAuthenticated()) {
        res.render('./fragmentos/frm_registrarEmpresa', {
            login: req.user.usuarios,
        });
    } else {
        res.render('templates/login', {
            login: '',
        });
    }
});

/*guardar empresas*/

router.post('/guardarEmpresa',empresaController.guardar);

router.get('/buscarExistenciaEmpresa',empresaController.buscarExistenciaEmpresa);

router.get('/buscarEmpresa',empresaController.buscarEmpresa);
/*guardar producto*/

router.post('/guardarProducto',productoController.guardarProducto);
router.post('/buscarProducto',productoController.buscarProducto);
router.post('/actualizar',productoController.actualizar);


/*registrar cliente*/
router.post('/guardarCliente',clienteController.guardarCliente);

/*buscar cliente*/
router.post('/buscarNuevoCliente',clienteController.buscarCliente);

/*buscar ultimo numero factura*/
router.get('/buscarUltimoNumeroFactura',facturaController.datosFactura);

router.post('/guardarFactura',facturaController.guardarFactura);


router.get('/buscarUsuario',usuarioController.buscarUsuario);
router.post('/updateUsuarioEdicion',usuarioController.actualizarUsuario);


router.post('/updateEmpresaEdicion',empresaController.actualizarEmpresa);

router.post('/eliminacionProducto',productoController.eliminarProducto);


module.exports = router;
