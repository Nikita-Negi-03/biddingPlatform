const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const NotificationModel = sequelize.define('notifications', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'notifications',
    timestamps: false // Disable timestamps
});

module.exports = NotificationModel;
