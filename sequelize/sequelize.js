import { Sequelize } from "sequelize";

const sequelize = new Sequelize('sociallife', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})

export default sequelize