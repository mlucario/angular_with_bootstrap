const { readFile, existsSync, writeFile } = require('fs');
const { printError, printLog } = require('../utils/log');

// read file
const readKey = (path,callback) => {
    try {
        readFile(path, 'utf8', (err, data) => {
            if (err) {
                return '';
            } else {
                callback(data);
                return data;
            }
        })
    } catch (error) {
        console.log('data error ', error);
        return '';
    }
}


// write to file
const writeKey = (path, key) => {  
    try {
        writeFile(path, key, (err) => {
            if (err) { throw err; }
        })
    } catch (error) {
        console.log(error);
    }
}

// readKey(path);
// writeKey(path,key);

module.exports = {
    writeKey, readKey
}