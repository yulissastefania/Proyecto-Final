module.exports = function (sequelize, Sequelize) {
    var aux = require('../models/usuario');
    var Usuario = new aux(sequelize, Sequelize);
    var Empresa = sequelize.define('empresa', {
        empresa_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        ruc: {
            type: Sequelize.STRING(13),
            notEmpty: true
        },
        razon_social: {
            type: Sequelize.STRING(60)
        },
        direc_matriz: {
            type: Sequelize.STRING(60)
        },

        direc_sucursal: {
            type: Sequelize.STRING(60)
        },
        telefono: {
            type: Sequelize.STRING(60)
        },
        external_id: {
            type: Sequelize.UUID
        }
    }); /* el telefono es multivalorado revisar*/

    Empresa.associate = function (models) {
        models.empresa.hasMany(models.producto, {
            foreignKey: 'id_empresa'
        });
        models.empresa.hasMany(models.factura, {
            foreignKey: 'id_empresa'
        });

    };
    Empresa.belongsTo(Usuario, {foreignKey: 'id_usuario',constraints: false});
    return Empresa;
};
