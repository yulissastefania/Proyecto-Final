module.exports = function (sequelize, Sequelize) {    
    var Detalle_factura = sequelize.define('detalle_factura', {
        detalle_factura_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        cantidad: {
            type: Sequelize.INTEGER,
        },
        precio_unitario: {
            type: Sequelize.DOUBLE(5, 2)
        },
        precio_total: {
            type: Sequelize.DOUBLE(5, 2)
        },
        external_id: {
            type: Sequelize.UUID
        }
    });
    
     Detalle_factura.associate = function (models) {
        models.detalle_factura.hasMany(models.producto, {
            foreignKey: 'id_detalle_factura'
        });
         models.detalle_factura.hasMany(models.factura, {
            foreignKey: 'id_detalle_factura'
        });
    };



    return Detalle_factura;
};
