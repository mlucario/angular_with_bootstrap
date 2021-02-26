/**
 * * We will validate the user's request two time
 * * 1 - at routes - middlewares
 * * 2 - validate in controller ( this file )
 *  NOTE we always have email and password in req.body
 */

"use strict";

const { validationResult } = require("express-validator");
const User = require("../models/user.model");

// NOTE ADD REPOSITORIES TO USE
const {
  addNewUser,
  findUserByUsername,
} = require("../repository/auth.repository");
// Need for hashing password
const bcrypt = require("bcrypt");
// Need for JWT
const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../config/auth.config").secret_key;
const { ROLES_DB } = require("../config/db.initial.config");
const { printLog, printError } = require("../utils/log");
const { createLogicalAnd } = require("typescript");

const signUp = (req, res) => {
  // check all middleware ( in routes file)
  const errors = validationResult(req);

  try {
    // NOTE errors will be array as express-validator implements
    if (!errors.isEmpty()) {
      console.log(errors);
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
      bcrypt.hash(password, 8, (error, passwordEncrypted) => {
        // ! Bcrypt Error!
        if (error) {
          // ! Error 503 Service Unavailable
          return res.status(503).json({
            status: false,
            messages: "Service unavaiable!",
            errorMessages: error.message,
          });
        } else {
          // * CREATE AN ACCOUT
          const newUser = new User(username, passwordEncrypted, role);

          // * REPONSITORY
          addNewUser(newUser, (error, results) => {
            if (error) {
              // ! Error 503 Service Unavailable
              return res.status(503).json({
                status: false,
                messages: "Database Service unavaiable!",
                errorMessages: error.message,
              });
            } else {
              return res.status(200).json({
                status: true,
                messages: "Create an account successfully!",
                data: {
                  results,
                  account: {
                    username,
                    role,
                  },
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

const signIn = (req, res) => {
  // * GET Validation result of username and password from request
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      // NOTE FORMAT OF ERROR
      // * [{"value":"","msg":"Email is missing","param":"username","location":"body"}]
      return res.status(400).json({
        status: false,
        messages: "Request field are invalid",
        errorMessages: errors.array().map((aAessage) => aAessage.msg),
      });
    } else {
      const { username, password } = req.body;

      // * Fetch and check if username is exist
      findUserByUsername(username, (error, results) => {
        if (error) {
          // ! Error 503 Service Unavailable
          return res.status(503).json({
            status: false,
            messages: "Database service unavaiable!",
            errorMessages: error.message,
          });
        }
        if (results.length > 0) {
          const {
            id,
            password: userPassword,
            roles,
            updated_at,
            status,
          } = results[0];
          bcrypt.compare(password, userPassword, (error, isMatched) => {
            if (error) {
              // ! Error 503 Service Unavailable
              return res.status(503).json({
                status: false,
                messages: "bcrypt service unavaiable!",
                errorMessages: error.message,
              });
            }
            if (isMatched) {
              // NOTE Implement JWT FROM HERE
              // STEP 1 : Create Payload for JWT
              const userPayload = {
                id: id,
                username: username,
                role: roles,
                lastest_signIn: new Date(),
                status,
              };

              jwt.sign(
                userPayload,
                SECRET_KEY,
                {
                  expiresIn: 3600,
                },

                (error, token) => {
                  if (error || token.length === 0) {
                    return res.status(404).json({
                      status: false,
                      accessToken: null,
                      message: "Fail to create token",
                      error,
                    });
                  }
                  if (token) {
                    let authorities = [];
                    ROLES_DB.forEach((aRole) => {
                      if (aRole[0] === roles?.toLowerCase()) {
                        authorities = aRole[2].split(",");
                      }
                    });

                    return res.status(200).json({
                      id,
                      username,
                      role_privileges: authorities,
                      accessToken: token,
                    });
                  }
                }
              );
            } else {
              return res.status(400).json({
                status: false,
                messages: `Password is wrong!`,
                errorMessages: `Password is not corrected`,
              });
            }
          });
        } else {
          return res.status(400).json({
            status: false,
            messages: `${username} does not exist!`,
            errorMessages: `${username} is not found`,
          });
        }
      });
    }
  } catch (error) {
    printError("CATCH ERROR SIGN IN");
    // ! Error 503 Service Unavailable
    return res.status(503).json({
      status: false,
      messages: "Service unavaiable!",
      errorMessages: error.message,
    });
  }
};

module.exports = {
  signUp,
  signIn,
};
