const sequelize = require("sequelize");
const db = require("../config/database/database");
var divisi = db.define(
    "divisi",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        divisi: { type: sequelize.STRING },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)
module.exports = divisi