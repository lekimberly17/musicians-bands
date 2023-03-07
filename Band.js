const {Sequelize, sequelize} = require('./db')
const { DataTypes } = require('sequelize')
const { Musician } = require('./Musician')

// TODO - define the Band model
let Band;
Band = sequelize.define('Band', {
    name: DataTypes.STRING,
    genre: DataTypes.STRING
})

// Band.hasMany(Musician);

module.exports = {
  Band,
};

