'use strict';

function resta(req, res) {
    var a = req.params.a;
    var b = req.params.b;
    var c = a - b;
    res.render('acerca', {title: 'Resta', descripcion: 'La resta es' + c});
}
module.exports={resta};