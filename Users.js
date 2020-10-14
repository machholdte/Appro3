
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
