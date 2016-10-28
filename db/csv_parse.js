/**
 * Created by ES on 23.10.2016.
 */
'use strict';
const fastCsv = require('fast-csv'),
    path = require('path'),
    fs = require('fs'),
    models = require('../models');

//let file = path.join(path.resolve('../../../', 'Desktop'), 'indicator pwt gdp_pc_past_10yr_growth.csv');
let file = path.join(path.resolve('../../../', 'Desktop'), 'indicator WB data GDP pc ppp.csv');

const fileStream = fs.createReadStream(file),
    parser = fastCsv({
        delimiter: ';',
        headers: true
    });

fileStream
    .on("readable", function () {
        var data;
        while ((data = fileStream.read()) !== null) {
            parser.write(data);
        }
    })
    .on("end", function () {
        parser.end();
    });

let output = [];
let outputFiltered = [];

parser
    .on("readable", function () {
        let data;
        while ((data = parser.read()) !== null) {
            output.push(data);
        }
    })
    .on("end", function () {
        //console.log(output);
        //return;
        output.map((country, i) => {
            return outputFiltered[country['']] = country;
        }).filter((country, i) => {
            for (let key in country) {
                if (key == '') {
                    delete country[key];
                }
            }
            return JSON.stringify(country);
        })

        // console.log(outputFiltered);
        console.log("**** Done parsing ****");

    });
let mapper = [];
let cnt = 0;
models.Country.findAll({attributes: ['Code', 'Name'], raw: true})
    .then((results) => {
        mapper = results;
    })
    .then(() => {
        mapper.map((country) => {
            let countryName = country['Name'];
            let result;

            if (result = compareCntr(outputFiltered, countryName)) {
                outputFiltered[country['Code']] = outputFiltered[result.countryName];
                delete outputFiltered[result.countryName];

                for (let key in outputFiltered[country['Code']]) {
                    if (outputFiltered[country['Code']][key] === '') {
                        outputFiltered[country['Code']][key] = null;
                    } else {
                        outputFiltered[country['Code']][key] = parseFloat(outputFiltered[country['Code']][key].replace(/[^\d\.]/g, '.'));
                    }
                }
            }

            function compareCntr(outputFiltered, countryName) {
                if (outputFiltered.hasOwnProperty(countryName)) {
                    return {countryName: countryName};
                } else {
                    for (let i in outputFiltered) {
                        // console.log(countryName.toUpperCase().substr(0, 4).indexOf(i.toUpperCase().substr(0, 4)));
                        if (i.length > 3) {
                            if ((countryName.toUpperCase().substr(0, 6).indexOf(i.toUpperCase().substr(0, 6)) !== -1)) {

                                if (countryName !== 'South Korea' && countryName !== 'South Georgia and the South Sandwich Islands' &&
                                    countryName !== 'United States Minor Outlying Islands') {
                                    // console.log(cnt++);
                                    // console.log(countryName);
                                    // console.log(country['Code']);
                                    return {countryName: i};

                                }
                            }
                        }
                    }
                }

                return false;
            }

            // return country;
        })

        console.log(outputFiltered);

        // console.log(mapper);

        //parseFloat( theString.replace(/[^\d\.]/g,'') );
        console.log(Object.keys(outputFiltered).length);
    })
    .then(() => {
        //for (let i in outputFiltered) {
        //    let years = Object.keys(outputFiltered[i]);
        //    years.forEach((year) => {
        //        console.log({
        //            code: i,
        //            year: parseInt(year),
        //            value: outputFiltered[i][year]
        //        });
        //    })
        //}
        //insertTable();
    })

function insertTable() {
    for (let i in outputFiltered) {
        let years = Object.keys(outputFiltered[i]);
        years.forEach((year) => {
            models.econGrowth.upsert({
                code: i,
                year: parseInt(year),
                value: outputFiltered[i][year]
            })

        })
        //console.log(i);
        //console.log(outputFiltered[i]);
    }
}