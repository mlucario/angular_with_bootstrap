const { check } = require('express-validator');
const { signUp } = require('../controllers/auth.controller');
const express = require('express')
const router = express.Router();
const {
    validateEmail, validateRoles, validatePassword,
    validateConfirmPassword
} = require('../middlewares/auth.validation');


router.post('/signup', [validateEmail, validatePassword,
    validateConfirmPassword, validateRoles,], signUp);

module.exports = router