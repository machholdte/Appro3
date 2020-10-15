
// opretter klassen User. 
class User {
    constructor(id, navn, alder, køn, job, interresse) {
        this.id = id;
        this.navn = navn;
        this.alder = alder;
        this.køn = køn; 
        this.job = job
        this.interresse = interresse;
    }
}
// Jeg opretter klassen FreeUser, som nedarver fra klassen user. Dette er for disse brugere, som ikke betaler for servicen. 
class FreeUser extends User {
    constructor (id, navn, alder, køn, job, interresse) {
        super(id, navn, alder, køn, job, interresse);
    }
}
// Til sidst opretter jeg klassen PaymentUser, som også nedarver fra klassen User, men som er for de betalende brugere. 
class PaymentUser extends User {
    constructor(id, navn, alder, køn, job, interresse, creditcard) {
        super(id, navn, alder, køn, job, interresse);
        this.creditcard = creditcard;
    }
}

// Derefter koder jeg mine users, idet vi ikke har en frontend eller DB. 

// Hardcoder 4 objekter (users) som bliver lavet ud fra mine 2 klasser. 
let birgitteFree = new FreeUser(1, "Birgitte", 28, "Kvinde", "Tømrer", "Fodbold");
let thomasFree = new FreeUser(2, "Thomas", 25, "Mand", "Maler", "Gaming");
let thorPay = new PaymentUser(3, "Thor", 32, "Mand", "kvinder","IT-programmering", "4000 5000 6500 8000");
let claraPay = new PaymentUser(4, "Clara", 24, "Kvinde", "Pædagog", "Skateboard", "5000, 4000, 3000, 2000");


let allUsers = [birgitteFree, thomasFree, thorPay, claraPay];

module.exports = allUsers;