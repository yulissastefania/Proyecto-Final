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

    var aux = require('../models/factura');
    var Factura = new aux(sequelize, Sequelize);
    Detalle_factura.belongsTo(Factura, {
        foreignKey: 'id_factura',
        constraints: false
    });


    return Detalle_factura;
};
