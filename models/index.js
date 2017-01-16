"use strict";

const fs = require("fs")
    , path = require("path")
    , Sequelize = require("sequelize")
    , env = process.env.NODE_ENV || "development"
    // ,config    = require(path.join(__dirname, '..', 'config.json')['database'])
    , sequelize = new Sequelize('world', 'root', 'root')
    , db = {};

fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach((file) => {
        //READ THROUGH SEQUELIZE DOCS
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
console.log('****DATABASE****');
// console.dir(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
