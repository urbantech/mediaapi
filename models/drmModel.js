const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class DRM extends Model {}

DRM.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    videoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'videos',
            key: 'id'
        }
    },
    drmType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    drmKey: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'drm',
    timestamps: true
});

module.exports = DRM;

