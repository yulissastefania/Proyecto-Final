var bCrypt = require('bcrypt-nodejs');
const uuidv4 = require('uuid/v4');

module.exports = function (passport, empresa, usuario) {
    //var Cliente = cliente; //modelo
    var Empresa = empresa; //modelo
    //var Factura = factura;
    //var Producto = producto;
    var Usuario = usuario;
    var LocalStrategy = require('passport-local').Strategy;


    passport.serializeUser(function (usuario, done) {

        done(null, usuario.clave);
    });

    passport.deserializeUser(function (id, done) {
        Usuario.findOne({
            where: {
                clave: id,
            }
        }).then(function (usuario) {
            if (usuario) {
                var userinfo = {
                    id: usuario.usuario_id,
                    external_id: usuario.external_id

                };
                done(null, userinfo);
            } else {
                done(usuario.errors, null);
            }
        });

    });

    //registro de usuarios por passport
    passport.use('local-singup', new LocalStrategy({
            usernameField: 'txt_emailUsua', //lo que esta como name en el input del registro
            passwordField: 'txt_passwordUsua', //lo que esta como name en el input del registro
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            //verificar si el email no esta registrado
            Usuario.findOne({
                where: {
                    email: email
                }
            }).then(function (usuario) { //promesa
                if (usuario) {

                    return done(null, false, {
                        message: 'El correo ya esta registrado'
                    });

                } else {

                    var userPassword = generateHash(password);
                    console.log("----------------");
                    console.log(req.body.txt_apellidoUsua);
                    Usuario.create({
                        apellido: req.body.txt_apellidoUsua,
                        nombre: req.body.txt_nombreUsua,
                        clave: userPassword,
                        email: email,
                        external_id: uuidv4(),
                    }).then(function (newUsuario, created) {
                        if (!newUsuario) {
                            return done(null, false);
                        }
                        if (newUsuario) {
                            return done(null, newUsuario);
                        }

                    });
                }
            });
        }
    ));

    //inicio de sesion
    passport.use('local-signin', new LocalStrategy({
            usernameField: 'emailLogin',
            passwordField: 'passwordLogin',
            passReqToCallback: true // allows us to pass back the entire request to the callback


        },

        function (req,email, password, done) {
        
            var Usuario = usuario;
            var Empresa = empresa
            
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            Usuario.findOne({
                where: {
                    email: email
                }
            }).then(function (usuario) {
                
                if (!usuario) {
                    console.log("correo no existe");
                    return done(null, false, {
                        message: 'Correo no existe'
                    });
                }
                if (!isValidPassword(usuario.clave, password)) {
                    console.log("clave incorrecta");
                    return done(null, false, {
                        message: 'Clave incorrecta.'
                    });
                }
                console.log("###############################################################################////////////////////////////////////////////////////////////////////////////////////////////////////////////////");
                console.log(usuario.get());
                var userinfo = usuario.get();
                return done(null, userinfo);

            }).catch(function (err) {
                console.log("cuenta erronea");
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Cuenta erronea'
                });
            });
        }
    ));



}
