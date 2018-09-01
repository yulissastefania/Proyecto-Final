module.exports = function (sequelize, Sequelize) {
    var Cliente = sequelize.define('cliente', {
        cliente_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        RUC: {
            type: Sequelize.STRING(13),
            notEmpty: true
        },

        cedula_ruc: {
            type: Sequelize.STRING(10),
            notEmpty: true
        },
        
        razon_social: {
            type: Sequelize.STRING(75)
        },
        
        nombre: {
            type: Sequelize.STRING(75)
        },
        
        apellido: {
            type: Sequelize.STRING(75)
        },
        email: {
            type: Sequelize.STRING(75),
            validate: {
                isEmail: {
                    args: true,
                    msg: 'No es un correo electronico valido'
                }
            }
        },
        direccion: {
            type: Sequelize.STRING(100)
        },
        telefono: {
            type: Sequelize.STRING(10)
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
