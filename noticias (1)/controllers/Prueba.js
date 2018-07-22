'use strict';
//zona de importaciones

class PruebaController {
    contructor() {}
    ;
            suma(req, res) {
        var a = parseInt(req.params.a);
        var b = parseInt(req.params.b);
        var c = a + b;
        res.render('acerca', {title: 'Suma', descripcion: 'La suma es' + c});
    }
    
    multiplicacion(req, res){
        var a = parseInt(req.params.a);
        var total= new Array;
        for(var i=1; i<=12; i++){
            total.push(i*a);
            
        }
        res.render('acerca', {title: 'Resultado de multiplicacion', total: total, a:a});
    }
    
    
}


module.exports = PruebaController;

