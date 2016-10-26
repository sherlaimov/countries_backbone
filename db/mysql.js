'use strict';
const mysql = require('mysql'),
    connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'world'
});
connection.connect((err) => {
    if (err) {
    console.error('error connecting: ' + err.stack);
    return;
}

console.log('connected as id ' + connection.threadId);
});
module.exports = connection;