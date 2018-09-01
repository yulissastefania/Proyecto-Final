function soloLetras(text) {
    text.change(function () {
        var regex = /^[a-zA-Z ]+$/;
        var aux = regex.test(text.val());
        console.log("addfasdfasdfasdfasdfasd")
        if (!aux) {
            text.val("");
            return false;
        } else {
            return true;
        }
    });

}

function validarClaves(textprimario, textverificar) {
    textverificar.change(function () {
        if (textverificar.val() == textprimario.val()) {
            return true;
        } else {
            
            textverificar.val("");
            
            return false;
        }
    });

}


function validarNum(text) {
    text.change(function () {
        validarSoloNumeros(text);
    });
}

function validarSoloNumeros(text) {
    var regex = /^[0-9]+$/;
    var aux = regex.test(text.val());
    if (!aux) {

        text.val("");
        return false;
    } else {

        return true;
    }

}

function validarSoloCedula(text, boton) {
    var valor = validarSoloNumeros(text, boton);
    if (valor == true) {
        if (text.val().length == 10) {
            var cad = text.val();
            var total = 0;
            var longitud = cad.length;
            var longcheck = longitud - 1;

            if (cad !== "" && longitud === 10) {
                for (i = 0; i < longcheck; i++) {
                    if (i % 2 === 0) {
                        var aux = cad.charAt(i) * 2;
                        if (aux > 9) aux -= 9;
                        total += aux;
                    } else {
                        total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
                    }
                }
                total = total % 10 ? 10 - total % 10 : 0;

                if (cad.charAt(longitud - 1) == total) {
                    return true;

                } else {

                    text.val('');
                    return false;

                }
            }
        } else {

            text.val('');
            return false;
        }

    } else {

        text.val('');
        return false;

    }


}

function validarSoloRuc(text, boton) {
    var valor = validarSoloNumeros(text, boton);
    var aux = text.val();
    if (aux.length == 13) {
        //alert(aux[10] + "°°°" + aux[11] + "°°°°" + aux[12]);
        if (aux[10] == 0 && aux[11] == 0 && aux[12] == 1) {
            var aux = aux.substring(0, 10);
            /*inicio*/
            if (valor == true) {
                if (aux.length == 10) {
                    var cad = aux;
                    var total = 0;
                    var longitud = cad.length;
                    var longcheck = longitud - 1;

                    if (cad !== "" && longitud === 10) {
                        for (i = 0; i < longcheck; i++) {
                            if (i % 2 === 0) {
                                var aux = cad.charAt(i) * 2;
                                if (aux > 9) aux -= 9;
                                total += aux;
                            } else {
                                total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
                            }
                        }
                        total = total % 10 ? 10 - total % 10 : 0;

                        if (cad.charAt(longitud - 1) == total) {

                            return true;

                        } else {

                            text.val("");
                            return false;

                        }
                    }
                } else {

                    text.val("");
                    return false;
                }

            } else {

                text.val("");
                return false;

            }
            /*fin*/
        } else {

            text.val("");
            return false
        }

    } else {

        text.val("");
        return false;
    }

}

function validarTelefono(text) {
    text.change(function () {
        var valor = validarSoloNumeros(text, boton);
        if (valor == true) {
            if (text.val().length == 9) {
                
                return true;
            } else {
                
                text.val("");
                return false;
            }
        } else {
           
            text.val("");
            return false;
        }
    });
}

function validarCorreo(text, boton) {
    var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    text.change(function () {
        if (regex.test(text.val())) {
            
            return true;
        } else {

          
            text.val("");
            return false;
        }
    });
}

function validarCedulaRuc(text) {
    text.change(function(){
        var aux = text.val();
        if (aux[10] == 0 && aux[11] == 0 && aux[12] == 1 && aux.length == 13) {
            return validarSoloRuc(text, boton);
        } else if(aux.length == 10) {
            return validarSoloCedula(text, boton);
        } else{
            text.val("");
            return false;
        }
    });
}

function validarDireccion(text,boton){
    text.change(function(){
        if(text.val() != ""){
           text.removeClass("red red-border");
            boton.removeAttr("disabled", "disabled");
            return true;
           }
    });
}
