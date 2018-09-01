
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

function soloLetras(text) {
    text.change(function () {
        var regex = /^[a-zA-Z ]+$/;
        var aux = regex.test(text.val());
        if (!aux) {

            text.val("");
            return false;
        } else {

            return true;
        }
    });

}

function validarLetrasNumeros(text) {
    text.change(function () {
        var regex = /^[0-9a-zA-Z ]+$/;
        var aux = regex.test(text.val());
        if (!aux) {

            text.val("");
            return false;
        } else {
            return true;
        }
    });

}
function validarSoloDecimal(text) {
    text.change(function () {
        var regex = /^[0-9]+([,-.]+[0-9]{0,2})$/;
        var aux = regex.test(text.val());
        if (!aux) {

            text.val("");
            return false;
        } else {

            return true;
        }
    });
}
