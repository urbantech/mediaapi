const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Licensee extends Model {}

Licensee.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    licenseType: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'licensee',
    timestamps: true
});

module.exports = Licensee;

