const express = require("express");
const app = express();
//Importação do Body-Parser
const bodyParser = require("body-parser")
//carregar arquivo de conexão
const connection = require("./database/database")

//Carregar controller de Categorias
const CategoriesController = require('./categories/CategoriesController')
const ArticlesController = require("./articles/ArticlesControllers")
const UsersContrller = require("./user/UsersController")

//Models
const Article = require('./articles/Article')
const Category = require('./categories/Category')
const User = require("./user/User")

//Configuração de View Engine como ejs
app.set('view engine', 'ejs')
//Configuração do Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
//Configuração para aceitar arquivos JSON
app.use(bodyParser.json())
//Configuração do Express para trabalhar com arquivos estáticos
app.use(express.static('public'))

connection
    .authenticate()
    .then(()=> console.log("Conexão feita com sucesso!"))
    .catch((err) => console.log(err))


app.use("/", CategoriesController)
app.use("/", ArticlesController)
app.use("/", UsersContrller)
//Rota Principal
app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {

        Category.findAll().then((categories)=>{
            res.render("index", {articles: articles, categories: categories})
        })

    })
})

app.get("/:slug", (req, res)=>{
    let slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then((article)=>{
        if(article != undefined){
            res.render("article", {article: article, categories: categories})
        } 
        else res.redirect("/")
    }).catch( err => res.redirect("/"))
})

app.get("/category/:slug", (req, res)=> {
    let slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if (category != undefined){
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories})
            })
        } else {
            res.redirect("/")
        }
    }).catch(err => res.redirect("/"))
})

//Inicia o servidor
app.listen(8080, ()=> console.log("O servidor está rodando!"))