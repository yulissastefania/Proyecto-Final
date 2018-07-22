var express = require('express');
var router = express.Router();


var pruebaControlador = require('../controllers/Prueba');
var pruebaSimple = require('../controllers/pruebaSimple');
var tabla = require('../controllers/tablas');


var obj = new pruebaControlador();



/* GET home page. 
 router.get('/', function(req, res, next) {
 res.render('index', { title: 'Express' });
 });
 */
/*
 router.get('/noticias/acerca', function(req, res, next) {
 res.render('acerca', { title: 'Acerca de', descripcion:'Las noticias que se quiere publicar en la pagina' });
 });
 
 router.get('/noticias/nuevaPagina', function(req, res, next) {
 res.render('nuevaPagina', { title: 'Robótica', descripcion:'los abances de la robótica' });
 });*/

/*router.get('/noticias/:a/:b', function(req, res, next) {//cuando querramos con id
 res.render('nuevaPagina', { title: 'Acerca de', descripcion:'Las noticias que se quiere publicar en la pagina  '+req.params.id});
 });*/

router.get('/', function (req, res, next) {
    var login = (req.session != undefined);
    //console.log(login+"  ****");
    //res.render('templates/app', { title: 'principal',login:login});
    if (login == true) {
        res.render('templates/app', {title: 'Principal', login: login,
            fragmento: '../fragmentos/listita',
            user: req.session.user,
            botonModal: '../fragmentos/botonModal',
            modalDatos: '../fragmentos/modalDatos'});

    } else {
        res.render('templates/app', {
            title: 'Principal',
            login: login
        });
    }


});


router.get('/login', function (req, res, next) {

    res.render('templates/login');
});


router.get('/nuevo', function (req, res, next) {

    res.render('templates/nuevo');
});


router.post('/login', function (req, res, next) {
    var email = req.body.email;//escojo los parametros que se envian por post
    var clave = req.body.pass;
    if (email == 'a@admin.com' && clave == '1234') {
        req.session.user = 'Administrador';
        res.redirect("/");
    } else {
        res.redirect('/login');
    }
});
//redireccion para el ingreso de datos en la tabla
router.get('/modalDatos', function (req, res, next) {

    res.render('fragmentos/modalDatos');
});





router.get('/noticias/suma/:a/:b', obj.suma);
router.get('/noticias/resta/:a/:b', pruebaSimple.resta);
router.get('/noticias/multiplicacion/:a', tabla.multiplicar);


module.exports = router;

// nib permite escribir css sin sus prefijos.
//stylus
//ejs
//plantilla esqueleto de la aplicacion herencia de plantilla se maneja con los fragmentos de la pagina
//podemos crear aquellos sitios donde se requiera enviar fragmentos html
//pantalla que nos 


