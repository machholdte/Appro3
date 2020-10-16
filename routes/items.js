// Importet express modulet.
const express = require('express');
// create jeg laver en router. 
const router = express.Router();

// opretter klassen User. 
class User {
    constructor(id, navn, alder, køn, job, interresse, image) {
        this.id = id;
        this.navn = navn;
        this.alder = alder;
        this.køn = køn; 
        this.job = job
        this.interresse = interresse;
        this.image = image;
    }
}
// Jeg opretter klassen FreeUser, som nedarver fra klassen user. Dette er for disse brugere, som ikke betaler for servicen. 
class FreeUser extends User {
    constructor (id, navn, alder, køn, job, interresse, image) {
        super(id, navn, alder, køn, job, interresse, image);
    }
}
// Til sidst opretter jeg klassen PaymentUser, som også nedarver fra klassen User, men som er for de betalende brugere. 
class PaymentUser extends User {
    constructor(id, navn, alder, køn, job, interresse, creditcard, image) {
        super(id, navn, alder, køn, job, interresse, image);
        this.creditcard = creditcard;
    }
}

// Derefter koder jeg mine users, idet vi ikke har en DB at gemme i. 

// Hardcoder 4 objekter (users) som bliver lavet ud fra mine 2 klasser. 
let birgitteFree = new FreeUser(1, "Birgitte", 28, "Kvinde", "Tømrer", "Fodbold", "BilledeAfMig.png");
let thomasFree = new FreeUser(2, "Thomas", 25, "Mand", "Maler", "Gaming", "BilledeAfMig.png");
let thorPay = new PaymentUser(3, "Thor", 32, "Mand", "kvinder","IT-programmering",  "4000 5000 6500 8000", "BilledeAfMig.png");
let claraPay = new PaymentUser(4, "Clara", 24, "Kvinde", "Pædagog", "Skateboard","5000, 4000, 3000, 2000", "BilledeAfMig.png");


let data = [birgitteFree, thomasFree, thorPay, claraPay];



// Jeg laver først et get Get response, som responderer data arrayey.
router.get('/', function (req, res) {
    res.status(200).json(data);
});


// Jeg laver et Get request, som kan hente enkelte attributter ved Users.
router.get('/:id', function (req, res) {
    // Jeg finder et specifikt objekt fra mit data array, og matcher det med item ID'et. 
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    // Hvis det findes, skal den respondere med det den har fundet og status 200. hvis ikke, status 404, som er ikke fundet. 
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// Derefter laver jeg et post request, som kan oprette en ny User i listen. Jeg har valgt, at det skal være en FreeUser, da jeg ikke har creditcard info med.
router.post('/', function (req, res) {
   // Først hentes items ID's fra data arrayet.
    let itemIds = data.map(item => item.id);
    
    // Derefter sættes nyt id til +1, så hver gang der laves en bruger mere, bliver ID'et 1 større.
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;

    // Jeg laver et objekt af FreeUser, som bliver oprettet med et nyt id hver gang. 
    let newUser = {
        id: newId, // Det nye ID, er oprette i variablen newId, og derfor sættes id til den. 
        navn: req.body.navn, 
        alder: req.body.alder,
        køn: req.body.køn, 
        job: req.body.job,
        interresse: req.body.interresse,
        image: req.body.image
    };

    // Jeg indsætter min nye User i data arrayet. 
    data.push(newUser);

    // responder med status 201, som indikerer at brugeren er succesfuldt oprretet.
    res.status(201).json(newUser);
});

// Jeg laver en update endpoint. Dog kun med interesse (interest jvf. opgave) og image.
router.put('/:id', function (req, res) {
    // Jeg finder attributten som skal opdateres i mit data array. og returner den i funktionen.
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

   // Så chekken den efter, om found er true eller false. Hvis den er true, kan image og interesse opdateres. 
    if (found) {
        let updated = {
            id: found.id,
            image: req.body.image, 
            interesse: req.body.interesse, 
        };

       // Den findes så det index i user arrayet, hvor attributten er fundet.
        let targetIndex = data.indexOf(found);

        // Vha. splice metoden, så opdaterer den så den gamle attribut, med den nye valgte attribut.
        data.splice(targetIndex, 1, updated);

        // 204 status sendes, hvis det virker.
        res.sendStatus(204);
    } else {
        // Hvis found ikke er true, responderes med status 404.
        res.sendStatus(404);
    }
});

    // Jeg laver et delete af en user, som bliver matchet med det ID, som vedkommende har i min dating app. 
router.delete('/:id', function (req, res) {
    //Igen søges efter id i useren.
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
         // Hvis id findes, skal den gemmes i targetIndex variabel.
        let targetIndex = data.indexOf(found);

        // Her slettes hele useren. 
        data.splice(targetIndex, 1);
    }

    // respons 204 sendes, ved success. 
    res.sendStatus(204);
});

// Jeg eksporter modulet, så det kan bruges i andre filer.
module.exports = router;