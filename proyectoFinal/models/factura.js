module.exports = function (sequelize, Sequelize) {

    var Factura = sequelize.define('factura', {
        factura_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        numero_factura: {
            type: Sequelize.INTEGER
        },

        numero_autoriazacion: {
            type: Sequelize.INTEGER
        },
        fecha_emision: {
            type: Sequelize.DATE
        },
        fecha_vencimiento: {
            type: Sequelize.DATE
        },
        contribuyente_especial: {
            type: Sequelize.STRING(4)
        },
        obligado_contabilidad: {
            type: Sequelize.DOUBLE(6, 2)
        },
        subtotal: {
            type: Sequelize.DOUBLE(5, 2)
        },
        iva_total: {
            type: Sequelize.STRING(5, 2)
        },
        iva_total: {
            type: Sequelize.STRING(5, 2)
        },
        external_id: {
            type: Sequelize.UUID
        }
    });
   Factura.associate = function (models) {
        models.factura.hasOne(models.detalle_factura, {
            foreignKey: 'id_factura'
        });
    };


    return Factura;
};
