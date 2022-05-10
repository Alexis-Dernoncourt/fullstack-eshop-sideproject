const regex = {
    // test input with accents but no specials chars like &, @, (, ), [, ',...
    noSpecialChars: /^[a-zA-Z '\-àäâéêëç]+$/i,

    // test PostalCode
    postalCode: /^[0-9]{5}$/,
};

exports.regex = regex;
