const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Stream extends Model {}

Stream.init({
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
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'stream',
    timestamps: true
});

module.exports = Stream;

