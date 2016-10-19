'use strict';

const express = require('express')
    , router = express.Router()
    // ,db = require('../db/mysql')
    , models = require('../models');


const countries = {};
let id = 0;

/* GET home page. */
router
    .get('/', function (req, res, next) {
        models.Country.findAll()
            .then((country) => {
                res.statusCode = 200;
                res.json(country);
                //console.log(JSON.stringify(country, null, 2));
            })

        //res.render('index', { title: 'Express' });
        //  db.connect();
        //  let results = [];
        //  db.query('select * from names', (err, result) => {
        //  res.json(result);
        //  })
        //db.end();
    })
    .post('/', (req, res, next) => {
        //modelInstance.save()
        let country = req.body;
        // models.Country.upsert({
        //     Code: country.Code,
        //     Name: country.Name,
        //     Population: country.Population
        // })
        //     .then((results) => {
        //         console.log(results);
        //         res.json(results);
        //     })

        country._id = ++id;
        countries[country._id] = country;
        console.log(country);
        res.json(country);
    })
    .get('/:code', (req, res, next) => {
        //modelInstance.fetch()
        let code = req.params.code;
        models.Country.findOne({where: {Code: code}})
            .then( (results) => {
                console.log(JSON.stringify(results, null, 2));
                res.json(results);
            })
    })

module.exports = router;
