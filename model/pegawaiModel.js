const sequelize = require("sequelize")
const db = require("../config/database/database")


var pegawai = db.define(
    "pegawai",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        nama: { type: sequelize.STRING },
        alamat: { type: sequelize.STRING },
        no_tlpn: { type: sequelize.STRING },
        jenis_kelamin: { type: sequelize.STRING },
        divisi_id: { type: sequelize.INTEGER }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)



module.exports = pegawai