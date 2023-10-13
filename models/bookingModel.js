const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Booking extends Model {}

Booking.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'booking',
    timestamps: true
});

module.exports = Booking;

