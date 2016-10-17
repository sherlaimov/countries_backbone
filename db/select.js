const connection = require('./mysql');

connection.connect();
connection.query('select * from names', (err, result) => {
    console.log(result);
    console.log();
})
connection.end();