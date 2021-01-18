const express = require("express");
const app = express();
//Importação do Body-Parser
const bodyParser = require("body-parser")
//carregar arquivo de conexão
const connection = require("./database/database")
//Carregar controller de Categorias
const CategoriesController = require('./categories/CategoriesController')
const ArticlesController = require("./articles/ArticlesControllers")

//Models
const Article = require('./articles/Article')
const Category = require('./categories/Category')

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
//Rota Principal
app.get("/", (req, res) => {
    res.render("index")
})

//Inicia o servidor
app.listen(8080, ()=> console.log("O servidor está rodando!"))