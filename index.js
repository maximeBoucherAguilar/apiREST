var express = require('express');
var app = express();
var port = 5000;

let bodyParser = require('body-parser');
app.use(bodyParser.json());

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/collegefrance",{useNewUrlParser:true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'erreur connexion :'));
db.once('open', function() {console.log('Connecté')});

var routerSportif = require('./app/routers/SportifsRouter');
var routerUser = require('./app/routers/UserRouter');
app.use('/api/membres', routerSportif);
app.use('/api/users', routerUser);

app.listen(port);
console.log('le serveur REST est lancé sur le port' + port);

//postman