module.exports = function (sequelize, Sequelize) {
    var aux = require('../models/empresa');
    var Empresa = new aux(sequelize, Sequelize);
    var Producto = sequelize.define('producto', {
        producto_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        cod_principal: {
            type: Sequelize.STRING(60)
        },
        nombre: {
            type: Sequelize.STRING(60)
        },
        marca: {
            type: Sequelize.STRING(60)
        },

        modelo: {
            type: Sequelize.STRING(60)
        },

        precio_unitario: {
            type: Sequelize.DOUBLE(5,2)
        },
        IVA: {
            type: Sequelize.DOUBLE(3,2)
        },
        precio_venta: {
            type: Sequelize.DOUBLE(5, 2)
        },

        external_id: {
            type: Sequelize.UUID
        }

    });
    return Producto;
};
