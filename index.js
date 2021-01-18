const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

//DATABSE
connection
.authenticate()
.then(() => {
    console.log("Conexao feita com o bando de dados!")
})
.catch((msgErro) =>{
    console.log(msgErro);
})

//EXPRESS
app.set('view engine', 'ejs');
app.use(express.static('public'));

//BODYPARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//ROTAS
app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true, order: [
        ['id', 'DESC']
    ]}).then(perguntas => {
        console.log(perguntas);
        res.render("index", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    });
});

app.listen(8080, () => {
    console.log("App rodando!");
});