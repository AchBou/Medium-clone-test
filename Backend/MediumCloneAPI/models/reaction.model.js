const { DataTypes } = require('sequelize');
const db = require('../DB')

const Reaction = db.sequelize.define("reaction", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = Reaction;
