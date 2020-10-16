// importer http og express modulet.
const http = require('http');
const express = require('express');
// laver en app, som invoker express funktionen.
const app = express();

// jeg bruges express, og json som middleware, så den kun matcher json tekst.
app.use(express.json());

// definerer en standard port til 3000
const port = 3000;


// Jeg laver en server med http og express modulet. 
const server = http.createServer(app);

// Jeg henter data fra routes folderen.
const itemsRouter = require('./routes/items');
// Jeg definerer users, som den url, der skal hentes, for at se users i mit request. 
app.use('/users', itemsRouter);

// Jeg sender et standard respons, om at mit api endpoint virker, på localhost:3000, når det tilgåes. 
app.use('/', function(req, res) {
    res.send('It works');
});

// Jeg aktiverer serveren, om at lytte efter kald på port 3000. 
server.listen(port);
