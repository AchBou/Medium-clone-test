const { DataTypes } = require('sequelize');

const db = require('../DB')


const Article = db.sequelize.define("article", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    draft: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});


module.exports = Article;

