// import required essentials
const express = require('express');
// create new router
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

// Derefter koder jeg mine users, idet vi ikke har en frontend eller DB. 

// Hardcoder 4 objekter (users) som bliver lavet ud fra mine 2 klasser. 
let birgitteFree = new FreeUser(1, "Birgitte", 28, "Kvinde", "Tømrer", "Fodbold", "BilledeAfMig.png");
let thomasFree = new FreeUser(2, "Thomas", 25, "Mand", "Maler", "Gaming", "BilledeAfMig.png");
let thorPay = new PaymentUser(3, "Thor", 32, "Mand", "kvinder","IT-programmering", "BilledeAfMig.png", "4000 5000 6500 8000");
let claraPay = new PaymentUser(4, "Clara", 24, "Kvinde", "Pædagog", "Skateboard", "BilledeAfMig.png", "5000, 4000, 3000, 2000");


let data = [birgitteFree, thomasFree, thorPay, claraPay];



// HTTP methods ↓↓ starts here.

// READ
// this api end-point of an API returns JSON data array
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// READ
// this api end-point returns an object from a data array find by id
// we get `id` from URL end-points
router.get('/:id', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// CREATE
// this api end-point add new object to item list
// that is add new object to `data` array
router.post('/', function (req, res) {
    // get itemIds from data array
    let itemIds = data.map(item => item.id);

    // create new id (basically +1 of last item object)
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;

    // Jeg laver et objekt af FreeUser, som bliver oprettet med et nyt id hver gang. 
    let newItem = {
        id: newId, // generated in above step
        navn: req.body.navn,
        alder: req.body.alder,
        køn: req.body.køn, 
        job: req.body.job,
        interresse: req.body.interresse,
        image: req.body.image
    };

    // push new item object to data array of items
    data.push(newItem);

    // return with status 201
    // 201 means Created. The request has been fulfilled and 
    // has resulted in one or more new resources being created. 
    res.status(201).json(newItem);
});

// UPDATE
// this api end-point update an existing item object
// for that we get `id` and `title` from api end-point of item to update
router.put('/:id', function (req, res) {
    // get item object match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    // check if item found
    if (found) {
        let updated = {
            id: found.id,
            image: req.body.image, // set value of `title` get from req
            interesse: req.body.interesse, // set value of `order` get from req
        };


        // find index of found object from array of data
        let targetIndex = data.indexOf(found);

        // replace object from data list with `updated` object
        data.splice(targetIndex, 1, updated);

        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// DELETE
// this api end-point delete an existing item object from
// array of data, match by `id` find item and then delete
router.delete('/:id', function (req, res) {
    // find item from array of data
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        // if item found then find index at which the item is
        // stored in the `data` array
        let targetIndex = data.indexOf(found);

        // splice means delete item from `data` array using index
        data.splice(targetIndex, 1);
    }

    // return with status 204
    // success status response code 204 indicates
    // that the request has succeeded
    res.sendStatus(204);
});

// module.exports is an object included in every JS file of Node.js
// application, whatever we assign to module.exports will be exposed as a module. 
module.exports = router;