const {Sequelize, sequelize} = require('./db');
const { DataTypes } = require('sequelize')

// TODO - define the Musician model
let Musician;

Musician = sequelize.define('Musician', {
    name: DataTypes.STRING,
    instrument: DataTypes.STRING
})

module.exports = {
    Musician
};
