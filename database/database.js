require('dotenv').config()
const sequelize = require("sequelize")

const connection = new sequelize('blog','root',process.env.SENHA_DB_BLOG,{
        host: 'localhost',
        dialect: 'mysql',
        timezone: "-03:00"
    }
)

module.exports = connection