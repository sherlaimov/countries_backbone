module.exports = function(sequelize, DataTypes){
    const Country = sequelize.define('Country', {
        Code: { type: DataTypes.STRING, primaryKey: true},
        Name: DataTypes.STRING,
        Population: DataTypes.INTEGER,
        Region: DataTypes.STRING,
        IndepYear: DataTypes.INTEGER,
        LifeExpectancy: DataTypes.FLOAT,
        GNP: DataTypes.FLOAT
    },
        {
            timestamps: false,
            tableName: 'Country'
        });

    return Country;
}