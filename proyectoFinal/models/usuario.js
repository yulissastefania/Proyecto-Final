module.exports = function (sequelize, Sequelize) {
    var Usuario = sequelize.define('usuario', {
        usuario_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        nombre: {
            type: Sequelize.STRING(75),
            notEmpty: true
        },
        apellido: {
            type: Sequelize.STRING(75),
            notEmpty: true
        },
        
        email: {
            type: Sequelize.STRING(75),
            validate: {
                isEmail: {
                    args: true,
                    msg: 'No es un correo electronico valido'
                }
            },
            notEmpty: true
        },
        clave: {
            type: Sequelize.STRING(75),
            notEmpty: true
        },
        

        external_id: {
            type: Sequelize.UUID
        }
    }); /* el telefono es multivalorado revisar*/


    Usuario.associate = function (models) {
        models.usuario.hasOne(models.empresa, {
            foreignKey: 'id_usuario'
        });
    };

    return Usuario;
};
