module.exports = function (sequelize, Sequelize) {
    var aux = require('../models/empresa');
    var Empresa = new aux(sequelize, Sequelize);
    var Producto = sequelize.define('producto', {
        producto_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        modelo: {
            type: Sequelize.STRING(60)
        },

        nombre: {
            type: Sequelize.STRING(60)
        },
        precio_unitario: {
            type: Sequelize.STRING(60)
        },
        iva: {
            type: Sequelize.STRING(4)
        },
        precio_venta: {
            type: Sequelize.DOUBLE(6, 2)
        },
        stock: {
            type: Sequelize.BOOLEAN
        },
        marca: {
            type: Sequelize.STRING(60)
        },
        nombre: {
            type: Sequelize.STRING(60)
        },
        codigo_principal: {
            type: Sequelize.STRING(60)
        },
        external_id: {
            type: Sequelize.UUID
        }

    });

    Producto.associate = function (models) {
        models.producto.hasMany(models.detalle_factura, {
            foreignKey: 'id_producto'
        });
    };



    Producto.belongsTo(Empresa, {
        foreignKey: 'id_empresa',
        constraints: false
    });
    return Producto;
};
