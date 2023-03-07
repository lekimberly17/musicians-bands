const {Sequelize, sequelize} = require('./db');
const { DataTypes } = require('sequelize')
const { Band } = require('./band');


// TODO - define the Musician model
let Musician;

Musician = sequelize.define('Musician', {
    name: DataTypes.STRING,
    instrument: DataTypes.STRING
})

// Musician.belongsTo(Band);

module.exports = {
    Musician,
};
