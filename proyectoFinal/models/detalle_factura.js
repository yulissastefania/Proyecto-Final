module.exports = function (sequelize, Sequelize) {
    var Detalle_factura = sequelize.define('detalle_factura', {
        detalle_factura_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        cantidad: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        precio_unitario: {
            type: Sequelize.DOUBLE(5,2)
        },

        valor_total: {
            type: Sequelize.DOUBLE(5,2)
        },
        external_id: {
            type: Sequelize.UUID
        }
    }); /* el telefono es multivalorado revisar*/
    return Detalle_factura;
};
