const passwordValidator = require('password-validator');

let schema = new passwordValidator();
    schema
        .is().min(8)
        .is().max(30)
        .has().uppercase()
        .has().lowercase()
        .has().digits(2)
        .has().not().spaces()
        .is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = passwordValidator;