const sequelize = require("sequelize")
const db = require("../config/database/database")
var user = db.define(
    "user",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        email: { type: sequelize.STRING },
        password: { type: sequelize.STRING },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)
module.exports = user