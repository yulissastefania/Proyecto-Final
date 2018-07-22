var express = require('express');
var router = express.Router();

// que es niv--> permite escribir css sin sus prefijos para los navegaores
//stylus--> 
//ejs-->
//herencia de plantillas-->
var pruebaControlador = require('../controllers/Prueba');
var obj = new pruebaControlador();
var pruebasi = require('../controllers/PruebaSimple');
//

/* GET home page. */


/*router.get('/noticias/acerca/:a/:b', function(req, res, next) {//ruta raiz 
 res.render('acerca', { title: 'Aceca de Noticias', descripcion:'las noticias que se quieran publicar' + req.params.id}); 
 
 });*/
// 
router.get('/login', function (req, res, next) {//ruta raiz 

    res.render('template/login');
});



router.get('/', function (req, res, next) {
    var login = (req.session.user != undefined);
    if (login == true) {
        res.render('template/app', {title: 'Principal', login: login,
            fragmento: '../fragmentos/frmprincipal', user: req.session.user});
    } else {

        res.render('template/app', {
            title: 'Principal',
            login: login
        });
    }
});


router.post('/login', function (req, res, next) {//ruta raiz 
    var email = req.body.email;
    var clave = req.body.pass;
    if (email == 'a@admin.com' && clave == '1234') {
        req.session.user = 'Administrador';
        res.redirect("/");
    } else {
        res.redirect('/login');
    }

});




// 
//router.get('/noticias/suma/:a/:b', obj.suma);
router.get('/noticias/resta/:a/:b', pruebasi.resta);
router.get('/noticias/multiplicacion/:a', obj.multiplicacion);


router.get('/noticias/nuevo', function (req, res, next) {//ruta raiz 
    res.render('nuevo', {title: '¿Es posible que un robot detecte las emociones humanas?', descripcion: ' '});

});


module.exports = router;
