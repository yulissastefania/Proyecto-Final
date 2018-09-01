module.exports = function (sequelize, Sequelize) {

    var Factura = sequelize.define('factura', {
        factura_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        
        numero_factura: {
            type: Sequelize.STRING(18)
        },

        numero_autoriazacion: {
            type: Sequelize.STRING(60)
        },
        fecha_emision: {
            type: Sequelize.DATEONLY
        },
        fecha_hora_autorizacion: {
            type: Sequelize.DATE
        },
        subtotal: {
            type: Sequelize.DOUBLE(5, 2)
        },
        IVA: {
            type: Sequelize.DOUBLE(5, 2)
        },
        IVA_total: {
            type: Sequelize.DOUBLE(5, 2)
        },
        valor_total: {
            type: Sequelize.DOUBLE(5, 2)
        },        
        tipo_emision: {
            type: Sequelize.STRING(15)
        },        

        external_id: {
            type: Sequelize.UUID
        }
    });
   


    return Factura;
};
