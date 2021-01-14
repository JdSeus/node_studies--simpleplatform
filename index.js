const express = require("express");
const app = express();

//Express irá utilizar o EJS como View Engine.
app.set('view engine', 'ejs');
//Express irá utilizar arquivos estáticos.
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index")
});

app.listen(8080, () => {
    console.log("App rodando!");
});