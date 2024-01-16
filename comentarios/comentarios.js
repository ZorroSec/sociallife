const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../sequelize/sequelize.js')

const Comentario = sequelize.define('comentarios', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    idpost: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comentario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataComentario: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

module.exports = Comentario