/**
 *  * GENERATE USER TABLE, ROLES TABLE, ROLES, AND ADMIN ACCOUNT
 */

// * GET DB CONNECTION
const dbConn = require('./mysql.config');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { printError, printLog } = require('../utils/log');


/* ----------------------- GENERATE DATABASE AND TABLE ---------------------- */

// const CREATE_DATABASE = 'CREATE DATABASE IF NOT EXISTS testing';
// * SQL QUERY CREATE TBL_USERS_TABLE
const CREATE_TBL_USERS_TABLE = `CREATE TABLE IF NOT EXISTS TBL_USERS (
    id INT NOT NULL AUTO_INCREMENT,   
    username VARCHAR(320) NOT NULL,
    password TEXT NOT NULL,
    roles VARCHAR(45) NOT NULL,
    first_name VARCHAR(45) NULL,
    last_name VARCHAR(45) NULL,
    phone VARCHAR(15) NULL,
    status TINYINT NULL DEFAULT 0,
    created_at VARCHAR(45) NULL,
    updated_at VARCHAR(45) NULL,
    PRIMARY KEY (id),    
    UNIQUE INDEX username_UNIQUE (username ASC) VISIBLE)`;

const CREATE_ROLES_TABLE = `CREATE TABLE IF NOT EXISTS TBL_ROLES (
    id INT NOT NULL AUTO_INCREMENT,
    role VARCHAR(45) NOT NULL,
    role_description VARCHAR(45) NULL,
    role_privileges VARCHAR(45) NULL DEFAULT 'read',
    PRIMARY KEY (id),
    UNIQUE INDEX role_UNIQUE (role ASC) VISIBLE)
  `;
const ROLES_LIST = [
    'employee',
    'manager',
   'admin'
]

const ROLES = [
    [
        'employee',
        'employee',
        'read'
    ],
    [
        'manager',
        'manager',
        'read,write,update'
    ], [

        'admin',
        'admin',
        'read,write,update,delete'
    ]];

const ADMIN_ACCOUNT = new User('nhonquy@gmail.com', bcrypt.hashSync('88Montecito', 10), 'admin');


const add_administrator_account = () => {
    dbConn.query("INSERT INTO TBL_USERS set ?", ADMIN_ACCOUNT, function (err, res) {
        if (err) {
            console.log(err);
            printError("db.initial.config.js Create Admin account error: ", err);
            throw err;
        }
        else {
            printLog("db.initial.config.js Create Admin Succesfully " + res.message);
        }
    });
}

const add_roles_to_table = () => {
    dbConn.query("INSERT INTO TBL_ROLES (role,role_description,role_privileges) VALUES  ?", [ROLES], function (err, res) {
        if (err) {
            printError("db.initial.config.js Create Admin account error: ", err);
            throw err;
        }
        else {
            printLog("db.initial.config.js Create Admin Succesfully " + res.message);

        }
    });
}


const create_tbl_users_table = () => {
    dbConn.query(CREATE_TBL_USERS_TABLE, (error, resutls, fields) => {
        if (error) {
            printError('db.initial.config.js CREATE_TBL_USERS_TABLE error:  ' + error.message);
            throw error;
        }

        if (resutls) {
            printLog('CREATE_TBL_USERS_TABLE successfully');
            dbConn.query("SELECT * FROM TBL_USERS WHERE username = ?", ADMIN_ACCOUNT.username, (err, results, field) => {
                if (err) {
                    throw err;
                }
                if (results[0]?.roles !== 'admin') {
                    add_administrator_account();
                } else {

                    printLog("Admin account added");
                }
            })
        }

        if (fields) {
            printLog('CREATE_TBL_USERS_TABLE fields:  ' + fields);
        }
    })
}

const create_tbl_roles_table = () => {
    dbConn.query(CREATE_ROLES_TABLE, (error, resutls, fields) => {
        if (error) {
            printError('db.initial.config.js CREATE_ROLES_TABLE error:  ' + error.message);
            throw error;
        }

        if (resutls) {
            printLog('CREATE_ROLES_TABLE successfully');
            dbConn.query("SELECT * FROM TBL_ROLES", (err, results, field) => {
                if (err) {
                    throw err;
                }

                if (results.length !== ROLES.length) {
                    add_roles_to_table();
                } else {
                    printLog("Roles account added");
                }
            })
        }

        if (fields) {
            printLog('CREATE_ROLES_TABLE fields:  ' + fields);
        }
    })
}


const db = {
    CREATE_USERS_TABLE: create_tbl_users_table,
    CREATE_ROLES_TABLE: create_tbl_roles_table,
    ROLES_LIST
};
module.exports = db;