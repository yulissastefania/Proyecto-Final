function validarVacio(text, boton) {
    text.change(function () {
        if (text.val() != "") {
            text.removeClass("red red-border");
            boton.removeAttr("disabled", "disabled");
            return true;
        }
    });
}

function validarSelect(text, textvalidar, boton) {
    text.change(function () {
        if (text.val() != textvalidar) {
            text.removeClass("red red-border");
            boton.removeAttr("disabled", "disabled");
            return true;
        }
    });
}

function soloLetras(text, boton) {
    text.change(function () {
        var regex = /^[a-zA-Z ]+$/;
        var aux = regex.test(text.val());
        if (!aux) {
            text.addClass("red red-border");
            boton.attr("disabled", "disabled");
            text.val("");
            return false;
        } else {
            text.removeClass("red red-border");
            boton.removeAttr("disabled", "disabled");
            return true;
        }
    });

}

function validarSoloDecimal(text, boton) {
    text.change(function () {
        var regex = /^[0-9]+([,-.]+[0-9]{0,2})$/;
        var aux = regex.test(text.val());
        alert(aux);
        if (!aux) {
            text.addClass("red red-border");
            boton.attr("disabled", "disabled");
            text.val("");
            return false;
        } else {
            text.removeClass("red red-border");
            boton.removeAttr("disabled", "disabled");
            return true;
        }
    });
}
