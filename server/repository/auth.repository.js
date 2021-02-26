const dbConn = require('../config/mysql.config');

const addNewUser =  (aUser, callback) => {
   
    return dbConn.query('INSERT INTO TBL_USERS SET ?', aUser, (err,results) => {
            if(!err){
                callback(null,results);
            }else{
                callback(err,null);
            }
        })
    
}


module.exports = {
    addNewUser
}