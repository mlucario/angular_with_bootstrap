/**
 * * We will validate the user's request two time
 * * 1 - at routes - middlewares
 * * 2 - validate in controller ( this file )
 *  NOTE we always have email and password in req.body
 */

"use strict";

const dbConn = require("../config/mysql.config");
const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const { random } = require("lodash");
const { addNewUser } = require("../repository/auth.repository");
// Need for hashing password
const bcrypt = require("bcrypt");
// Need for JWT
const jwt = require("jsonwebtoken");

const signup = (req, res) => {
    // check all middleware ( in routes file)
    const errors = validationResult(req);

    try {
        // NOTE errors will be array as express-validator implements
        if (!errors.isEmpty()) {
            // NOTE FORMAT OF ERROR
            // * [{"value":"","msg":"Email is missing","param":"username","location":"body"}]
            return res.status(400).json({
                status: false,
                messages: "Request field are invalid",
                errorMessages: errors.array().map((aAessage) => aAessage.msg),
            });
        } else {
            // we have username(email), password,roles(array) at this point
            const { username, password, role } = req.body;

            // * HASHED PASSWORD
            bcrypt.hash(password, 8, (err, passwordEncrypted) => {               

                // ! Bcrypt Error!
                if (err) {
                    // ! Error 503 Service Unavailable
                    return res.status(503).json({
                        status: false,
                        messages: "Service unavaiable!",
                        errorMessages: err.message,
                    });
                } else {
                    // * CREATE AN ACCOUT
                    const newUser = new User(username, passwordEncrypted, role);

                    // * REPONSITORY
                    addNewUser(newUser, (err, results) => {
                        if (err) {
                            // ! Error 503 Service Unavailable
                            return res.status(503).json({
                                status: false,
                                messages: "Database Service unavaiable!",
                                errorMessages: err.message,
                            });
                        } else {
                            return res.status(200).json({
                                status: true,
                                messages: "Create an account successfully!",
                                data : {
                                    results,
                                    account: {
                                        username,role
                                    }
                                },
                            });
                        }
                    });

                }
            });
        }
    } catch (error) {
        // ! Error 503 Service Unavailable
        return res.status(503).json({
            status: false,
            messages: "Service unavaiable!",
            errorMessages: error.message,
        });
    }
};

const generateId = () => random(2, 100000);

module.exports = {
    signUp: signup,
};
