import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../sequelize/sequelize.js";

const Post = sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataPost: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

export default Post