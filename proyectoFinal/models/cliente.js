module.exports = function (sequelize, Sequelize) {
    var Cliente = sequelize.define('cliente', {
        cliente_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        ruc: {
            type: Sequelize.STRING(13)
        },

        cedula: {
            type: Sequelize.STRING(10)
        },
        razon_social: {
            type: Sequelize.STRING(60)
        },
        nombre: {
            type: Sequelize.STRING(60)
        },
        apellido: {
            type: Sequelize.STRING(60)
        },
        direccion: {
            type: Sequelize.STRING(60)
        },
        telefono: {
            type: Sequelize.STRING(10)
        },
        email: {
            type: Sequelize.STRING(60),
            validate: {
                isEmail: {
                    args: true,
                    msg: 'No es un correo electronico valido'
                }
            }
        },
        external_id: {
            type: Sequelize.UUID
        }
    });

    Cliente.associate = function (models) {

        models.cliente.hasOne(models.factura, {
            foreignKey: 'id_cliente'
        });

    };

    return Cliente;
};
