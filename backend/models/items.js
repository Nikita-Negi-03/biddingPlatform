const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ItemsModel = sequelize.define('items', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    starting_price: {
        type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
        allowNull: false
    },
    current_price: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false,
        defaultValue: sequelize.col('starting_price')
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'items',
    timestamps: false 
});

module.exports = ItemsModel;
