
// opretter klassen User. 
class User {
    constructor(id, navn, alder, køn, job, interesseretI) {
        this.id = id;
        this.navn = navn;
        this.alder = alder;
        this.køn = køn; 
        this.job = job
        this.interesseretI = interesseretI;
    }
}
// Jeg opretter klassen FreeUser, som nedarver fra klassen user. Dette er for disse brugere, som ikke betaler for servicen. 
class FreeUser extends User {
    constructor (id, navn, alder, køn, job, interesseretI) {
        super(id, navn, alder, køn, job, interesseretI);
    }
}
// Til sidst opretter jeg klassen PaymentUser, som også nedarver fra klassen User, men som er for de betalende brugere. 
class PaymentUser extends User {
    constructor(id, navn, alder, køn, job, interesseretI, creditcard) {
        super(id, navn, alder, køn, job, interesseretI);
        this.creditcard = creditcard;
    }
}


// Hardcoder 2 objekter som bliver lavet ud fra mine 2 klasser. 
let birgitteFree = new FreeUser(1, "Birgitte", 28, "kvinde", "tømrer", "mænd");
let thomasFree = new FreeUser(2, "Thomas", 25, "Mand", "Maler", "kvinder");
let thorPay = new PaymentUser(3, "Thor", 32, "Mand", "kvinder","lærer","4000 5000 6500 8000");
let claraPay = new PaymentUser(4, "Clara", 24, "Kvinde", "Pædagog", "mænd", "5000, 4000, 3000, 2000");


let allUsers = [birgitteFree, thomasFree, thorPay, claraPay];
