const {Sequelize, sequelize} = require('./db');
const { DataTypes } = require('sequelize')


// TODO - define the Song model
let Song;

Song = sequelize.define('Song', {
    title: DataTypes.STRING,
    year: DataTypes.NUMBER
})

module.exports = {
    Song
};