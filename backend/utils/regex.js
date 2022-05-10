const regex = {
    passwordCheck : new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#$%&()+,-./:;=?@\\[\\]^_`{|}~])[A-Za-z0-9!#$%&()+,-./:;=?@\\[\\]^_`{|}~]{8,}$"),
    mailCheck : new RegExp(".+@.+\.[a-zA-Z]{2,}$", "i"),

    // test input with accents but no specials chars like &, @, (, ), [, ',...
    noSpecialChars: new RegExp("^[a-zA-Z '\-éèëêâäàûüùç,]+$", "i"),

    // test input with accents but no specials chars like &, @, (, ), [, ', but accepts ponctuation signs like '!', '?'...
    noSpecialCharsWithPonctuation: new RegExp("^[a-zA-Z- \.éèëêâäàûüùç,:!?'&]+$", "i"),

    // test PostalCode
    postalCode: new RegExp("^[0-9]{5}$"),

    // test Price
    price: new RegExp("^[0-9]{1,5}[\.?^0-9]{0,2}"),
};

exports.regex = regex;