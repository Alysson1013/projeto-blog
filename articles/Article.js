const Sequelize = require('sequelize')
const connection = require("../database/database")
const Category = require("../categories/Category")

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING(8000),
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//Relacionamento entre Categoria e Artigos
//Diz que uma Categoria tem muitos artigos
Category.hasMany(Article)
//Relacionamento entre artigo e Categoria
//Quer dizer que artigo pertence a uma Categoria
Article.belongsTo(Category)

/*
Article.sync({
force: true
})
*/
module.exports = Article