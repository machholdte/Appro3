// Henter mine klasser fra anden fil.
const users = require('../Appro3/Users.js')

// Derefter koder jeg mine users, idet vi ikke har en frontend eller DB. 

// Hardcoder 4 objekter (users) som bliver lavet ud fra mine 2 klasser. 
let birgitteFree = new FreeUser(1, "Birgitte", 28, "kvinde", "tømrer", "fodbold", "mænd");
let thomasFree = new FreeUser(2, "Thomas", 25, "Mand", "Maler", "kvinder", "gaming");
let thorPay = new PaymentUser(3, "Thor", 32, "Mand", "kvinder","lærer", "IT-programmering", "4000 5000 6500 8000");
let claraPay = new PaymentUser(4, "Clara", 24, "Kvinde", "Pædagog", "mænd", "skateboard", "5000, 4000, 3000, 2000");


let allUsers = [birgitteFree, thomasFree, thorPay, claraPay];


function usersInApp (req, res) {
    res.json(allUsers);
}

// Eksporter funktionen
module.exports = usersInApp;