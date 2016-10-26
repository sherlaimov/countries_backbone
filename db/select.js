const connection = require('./mysql');

//connection.connect();
connection.query('select * from city LIMIT 5', (err, result) => {
    console.log(result);
});

connection.query('select * from city LIMIT 5', (err, result) => {
    console.log(result);
})


//connection.end();