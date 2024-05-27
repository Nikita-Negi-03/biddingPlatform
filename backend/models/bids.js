const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BidsModel = sequelize.define('bids', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    item_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'items',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    bid_amount: {
        type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'bids',
    timestamps: false 
});

module.exports = BidsModel;
