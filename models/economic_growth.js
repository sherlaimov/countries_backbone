/**
 * Created by sherlaimov on 25.10.2016.
 */
module.exports = function(sequelize, DataTypes){
    const econGrowth = sequelize.define('econGrowth', {
            code: DataTypes.STRING,
            year: DataTypes.INTEGER,
            value: DataTypes.FLOAT,
        },
        {
            timestamps: false,
            tableName: 'economic_growth'
        });

    return econGrowth;
}