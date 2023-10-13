const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Transcoding extends Model {}

Transcoding.init({
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
    format: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'transcoding',
    timestamps: true
});

module.exports = Transcoding;

