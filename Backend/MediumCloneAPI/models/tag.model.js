const { DataTypes } = require('sequelize');

const db = require('../DB')

const Tag = db.sequelize.define("tag", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});


module.exports = Tag;

