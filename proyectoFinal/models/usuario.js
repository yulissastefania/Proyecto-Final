module.exports = function (sequelize, Sequelize) {
    var Usuario = sequelize.define('usuario', {
        usuario_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        nombre: {
            type: Sequelize.STRING(60)
        },
        apellido: {
            type: Sequelize.STRING(60)
        },
        clave: {
            type: Sequelize.STRING(60)
        },
        email: {
            type: Sequelize.STRING(60),
            validate: {
                isEmail: {
                    args: true,
                    msg: 'No es un correo electronico valido'
                }
            },
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
