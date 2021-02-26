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



exports.login = (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: false,
          messages: errors.array().map((aAessage) => aAessage.msg),
        });
      } else {
        const { username, password } = req.body;
        User.findOne({
          username,
        })
          .populate('roles', '-__v')
          .exec((err, user) => {
            if (err) {
              return res.status(500).json({ status: false, message: err });
            }
  
            if (!user) {
              return res.status(404).send({
                status: false,
                accessToken: null,
                message: 'User Not found.',
              });
            }
  
            // Check password
            const userPassword = user.password;
  
            bcrypt.compare(password, userPassword, (err, isMatch) => {
              if (err) {
                return res.status(500).json({ status: false, message: err });
              }
  
              if (isMatch) {
                // NOTE JWT : payload.header.signature
  
                // STEP 1 : Create Payload
                const payload = {
                  id: user._id,
                  username: user.username,
                  email: user.email,
                };
                // Add authentication JWT here
                jwt.sign(
                  payload,
                  db.SECRET_KEY,
                  {
                    expiresIn: 3600,
                  },
  
                  (err, token) => {
                    if (err) {
                      return res.status(404).json({
                        status: false,
                        accessToken: null,
                        message: 'Fail to create token',
                        error: err,
                      });
                    }
                    if (token) {
                      var authorities = [];
                      for (let i = 0; i < user.roles.length; i++) {
                        authorities.push(
                          'ROLE_' + user.roles[i].name.toUpperCase()
                        );
                      }
  
                      return res.status(200).send({
                        id: user._id,
                        roles: authorities,
                        accessToken: token,
                      });
                    }
                  }
                );
              } else {
                return res.status(404).json({
                  status: false,
                  accessToken: null,
                  message: 'Password is incorrected',
                });
              }
            });
          });
      }
    } catch (error) {
      // ! Error 503 Service Unavailable
      return res.status(503).json({
        status: false,
        messages: 'Service unavaiable get weather errors',
        errorMessage: error.message,
      });
    }
  };

  

module.exports = {
    signUp: signup,
};
