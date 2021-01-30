const express = require("express")
const router = express.Router();
const User = require("./User")
const bcrypt = require('bcryptjs');
const { route } = require("../articles/ArticlesControllers");

router.get("/admin/users", (req, res)=>{
    User.findAll().then(users => {
        res.render("admin/users/users", {users: users})
    })
})

router.get("/admin/users/create", (req, res)=>{
    res.render("admin/users/create")
})

router.post("/users/create", (req, res)=>{
    let email = req.body.email
    let password = req.body.password

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user == undefined){
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)
        
            User.create({
                email: email,
                senha: hash
            }).then(() => res.redirect("/"))
              .catch(err => res.redirect("/"))
        }
        else res.redirect("/admin/users/create")
    })
})

router.get("/login", (req, res)=>{
    res.render("admin/users/login")
})

router.post("/authenticate", (req, res) => {

    let email = req.body.email
    let password = req.body.password

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        //Validação de login
        if (user != undefined){
            let correct = bcrypt.compareSync(password, user.senha)
            if (correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/users")
            } 
            else{
                res.redirect("login")
            } 
        } else {
            res.redirect("/login")
        }
    })
})

module.exports = router