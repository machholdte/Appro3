// importer http og express modulet.
const http = require('http');
const express = require('express');
// laver en app, som invoker express funktionen.
const app = express();
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Jeg laver nu et json webtoken, som giver adgang til users.
app.get('/readme', (req, res) => {
    res.json({"message": "To access the users, u need to have permission to do so."});
});

// Jeg laver et get request, som skal sende mit webtoken, som bruges til at få adgang til users.
app.get('/jwt', (req, res) => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
// Laver et JWT token, med algoritmen HS256. 
    let token = jwt.sign({"body": "stuff"}, privateKey, {algorithm: 'HS256'});
    res.send(token);
})

// laver en authenticator, som jeg kan sætte på mine API endpoints. 
function isAuthorized(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split (" ")[1];
        let privateKey = fs.readFileSync ('./private.pem', 'utf8'); 

        // Webtoken skal godkendes ift. min pem fil. Bruger standard algoritmen HS256. Next, hvis authorization er givet.
        jwt.verify(token, privateKey, {algorithm: "HS256"}, (err, decoded) => {
            if(err) {
               res.status(500).json({error: "Not Authorized"}); 
            }

            console.log(decoded);

            return next();
        })
    } else {
        res.status(500).json({ error: "Not authorized"});
    }
}

// jeg bruges express, og json som middleware, så den kun matcher json tekst.
app.use(express.json());

// definerer en standard port til 3000
const port = 4500;

// Jeg laver en server med http og express modulet. 
const server = http.createServer(app);

// Jeg henter data fra routes folderen.
const itemsRouter = require('./routes/items');
// Jeg definerer users, som den url, der skal hentes, for at se users i mit request. Derudover sætter jeg authorization på, 
//så man skal have adgang, for at tilgå users..

app.use('/users',isAuthorized, itemsRouter);

// Jeg sender et standard respons, om at mit api endpoint virker, på localhost:3000, når det tilgåes. Dette kræver ikke tilladelse.
app.use('/', function(req, res) {
    res.send('It works');
});

// Jeg aktiverer serveren, om at lytte efter kald på port 3000. 
server.listen(port);



