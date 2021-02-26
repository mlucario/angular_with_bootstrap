/**
 * * We will validate the user's request two time
 * * 1 - at routes - middlewares
 * * 2 - validate in controller ( this file )
 *  NOTE we always have email and password in req.body
 */

'use strict';

const dbConn = require('../config/mysql.config');
const { validationResult } = require('express-validator');
const User = require('../models/user.model');
const {random} = require('lodash');

// Need for hashing password
const bcrypt = require('bcrypt');
// Need for JWT
const jwt = require('jsonwebtoken');

const signup = (req, res) => {
    const errors = validationResult(req);
    
    try {
        // NOTE errors will be array as express-validator implements
        if (!errors.isEmpty()) {
            // FORMAT OF ERROR
            // * [{"value":"","msg":"Email is missing","param":"username","location":"body"}]

            console.log("signup controller ERRORS : " + JSON.stringify(errors));
            
            return res.status(400).json({
                status: false,
                messages: "Request field are invalid",
                errorMessages: errors.array().map((aAessage) => aAessage.msg)
            });
        } else {
            console.log("COME HERE");
            // we have username(email), password,roles(array) at this point
            const {username,password, role} = req.body;
          
            bcrypt.hash(password,8,(err,passwordEncrypted) => {
                const newUser = new User(username, passwordEncrypted, role);
                return "ON";
            })
          }

    } catch (error) {
        // ! Error 503 Service Unavailable
        return res.status(503).json({
            status: false,
            messages: 'Service unavaiable get weather errors',
            errorMessages: error.message,
        });
    }
}

const generateId = ()=> random(2,100000);

module.exports = {
    signUp : signup
}