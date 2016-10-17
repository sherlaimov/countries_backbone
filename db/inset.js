'use strict';
 const connection = require('./mysql');

let person = {
    name: 'Eugene',
    meaning: 'Noble',
    gender: 'boy'
};
let query = connection.query('insert into names set ?', person, (err, result) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(result);
    console.log(query.sql);
})

//connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//    if (err) throw err;
//
//    console.log('The solution is: ', rows[0].solution);
//});

connection.end();