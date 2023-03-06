const {Sequelize, sequelize} = require('./db');
const { DataTypes } = require('sequelize')

// TODO - define the Band model
let Band;
Band = sequelize.define('Band', {
    name: DataTypes.STRING,
    genre: DataTypes.STRING
})

module.exports = {
  Band,
};
