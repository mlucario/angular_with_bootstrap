const { check } = require('express-validator');
const dbConn = require('../config/mysql.config');
const { ROLES_LIST } = require('../config/db.initial.config');

validateEmailSignUp = check('username')
    .trim()
    // * Check if email is null or empty
    .exists(
        {
            checkFalsy: true,
            checkNull: true
        }
    )
    // * Return message if fail validate
    .withMessage('Email is missing')
    .bail() // * will stop and throw error
    .isEmail()
    .normalizeEmail()
    .withMessage('Email is invalid')
    .bail() // throw error when email is invalid
    .custom(async email => {
        const value = await isEmailInUse(email);
        if (value) {
            throw new Error('Email is already exists!!!');
        }
    }).withMessage('Invalid email address!!!');

    validateEmailSignIn = check('username')
    .trim()
    // * Check if email is null or empty
    .exists(
        {
            checkFalsy: true,
            checkNull: true
        }
    )
    // * Return message if fail validate
    .withMessage('Email is missing')
    .bail() // * will stop and throw error
    .isEmail()
    .normalizeEmail()
    .withMessage('Email is invalid')
    .bail() // throw error when email is invalid
  


validatePassword = check('password')
    .trim()
    .exists({
        checkFalsy: true,
        checkNull: true,
    })
    .withMessage('Password is missing')
    .bail()
    .isLength({
        min: 6,
        max: 30,
    })
    .withMessage('Password need more than 6 characters');
// TODO add pattern to check strong password
//   .matches(/^[a-z]+[a-z0-9]+$/)
//   .withMessage('Password is not strong enought');

validateConfirmPassword = check('confirm_password')
    .trim()
    .exists({
        checkFalsy: true,
        checkNull: true,
    })
    .withMessage('Confirm Password is missing')
    .bail()
    .isLength({
        min: 6,
        max: 30,
    })
    .withMessage('Confirm Password need more than 6 characters')
    .bail()
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    });
validateRoles = check('role')       
    .notEmpty()
    .withMessage('Email is missing.')
    .bail()      
    .trim()
    .matches(/^[A-Za-z]+$/)
    .withMessage('Email is invalid.')
    .bail() 
    .custom((role) => {

        if (!ROLES_LIST.includes(role)) {
            throw new Error(`${role} does not exist. Get another role`);
        }

        return true;
    });



const isEmailInUse = (email) => {
    return new Promise((resolve, reject) => {
        dbConn.query("SELECT * FROM TBL_USERS WHERE username = ?", email, (err, results, fields) => {
            if (!err) {
                // console.log("RESULT " + JSON.stringify(results));
                // console.log("Email count " + results.length);
                return resolve(results.length > 0);
            } else {
                return reject(new Error('Database error!!'));
            }
        })
    })
};
const validateAuth = {
    validateEmailSignUp,
    validateEmailSignIn,
    validateRoles,
    validatePassword,
    validateConfirmPassword
}

module.exports = validateAuth;