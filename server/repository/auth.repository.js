const dbConn = require('../config/mysql.config');

const addNewUser = (aUser, callback) => {

    dbConn.query('INSERT INTO TBL_USERS SET ?', aUser, (err, results) => {
        if (!err) {
            callback(null, results);
        } else {
            callback(err, null);
            throw err;
        }
    })

}

const findUserByUsername = (username, callback) => {
    dbConn.query('SELECT * FROM TBL_USERS WHERE username = ?', username, (err, results) => {
        if (!err) {
            setLastestSignIn(new Date().toLocaleString(), username);
            callback(null, results);
        } else {
            callback(err, null);
            throw err;
        }
    })
}


const setLastestSignIn = (strDate, username) => {
    dbConn.query('UPDATE TBL_USERS SET updated_at=? WHERE username = ?', [strDate, username], (error, results) => {
        if (error) throw error;
    })
}
module.exports = {
    addNewUser, findUserByUsername
}