const { DataTypes } = require('sequelize');
const db = require('../DB')

const Comment = db.sequelize.define("comment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = Comment;
