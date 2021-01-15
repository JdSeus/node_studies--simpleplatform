const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database")

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
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    res.send("Formulário recebido!" + "<br>" + "titulo: " + titulo + "<br>" + "descricao: " + descricao);
});

app.listen(8080, () => {
    console.log("App rodando!");
});