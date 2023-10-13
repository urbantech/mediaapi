const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Payment extends Model {}

Payment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    licenseeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'licensees',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'payment',
    timestamps: true
});

module.exports = Payment;

