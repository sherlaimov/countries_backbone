const Sequelize = require('sequelize'),
    connection = new Sequelize('world', 'root', 'root');

const City = connection.define('City', {
    Name: Sequelize.STRING,
    CountryCode: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    District: Sequelize.CHAR,
    Population: Sequelize.INTEGER
},
    {
        timestamps: false,
        tableName: 'City'
    });

// connection.sync()
//     .then(() => {
//         City.create({
//             Name: 'Ukraine',
//             CountryCode: 'UA',
//             District: 'Eastern Europe',
//             Population: 40
//         })
//     });

connection.sync({
    logging: console.log
})
    .then(() => {
        City.findById(1).then((city) => {
            console.log(
                JSON.stringify(city.dataValues, null, 2));
        })
    })
    .then(()=>{
        City.findOne({where: {Name:'Kyiv'}})
            .then((data) => {
                console.log(data.dataValues);
            })
    })
    .catch((err) => {
        throw new Error(err);
    })

