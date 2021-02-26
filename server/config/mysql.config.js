'use strict';
const mysql = require('mysql');

const { printError, printLog } = require('../utils/log');
//local mysql db connection
const dbConn = mysql.createConnection({
    host: '165.227.6.199',
    user: 'angular_demo',
    password: '7Eo&8OVR0R^VgjP',
    database: 'angular_bootstap_app01'
});
dbConn.connect(function (err) {
    if (err) {
        printError(err);
        throw err;
    }
    printLog("Database Connected!");
});
module.exports = dbConn;