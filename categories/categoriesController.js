const express = require('express')
const router = express.Router()

//rota para criação de novas categorias
router.get("/admin/categories/new", (req, res)=>{
    res.render("admin/categories/new.ejs")
});

module.exports = router