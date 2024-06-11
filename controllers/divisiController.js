const { Op } = require("sequelize")
const controller = {}
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretkey');

const divisiModel = require("../model/divisiModel")
const model = {}
model.divisi = divisiModel


controller.getAll = async function (req, res) {
    try {
        const divisiData = await model.divisi.findAll()
        if (divisiData.length > 0) {
            res.status(200).json({
                message: "Connection Successfull",
                data: divisiData
            })
        } else {
            res.status(200).json({
                message: "Data Empty",
                data:[]
            })
        }
    } catch (error) {

    }
}

module.exports = controller