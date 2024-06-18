const { Op } = require("sequelize")
const controller = {}
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
                data: []
            })
        }
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

controller.getDivisiById = async function (req, res) {
    try {
        var divisiData = await model.divisi.findAll({
            where: { id: { [Op.like]: `%${req.params.id}` } }
        })
        if (divisiData.length > 0) {
            res.status(200).json({ message: "Connection Successful", data: divisiData })
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}


controller.insertDivisi = async function (req, res) {
    try {
        await model.divisi.create({
            divisi: req.body.divisi,
            description: req.body.description
        })
            .then((result => {
                res.status(201).json({
                    message: "divisi successfull created",
                    data: {
                        divisi: req.body.divisi
                    }
                })
            }))
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

controller.editDivisi = async function (req, res) {
    try {
        await model.divisi.findAll({ where: req.body.id })
            .then(async (result) => {
                if (result.length > 0) {
                    await model.divisi.update(
                        {
                            divisi: req.body.divisi,
                            description: req.body.description
                        },
                        {
                            where: { id: req.body.id }
                        }
                    )
                } else {
                    res.status(500).json({ message: "update failed" });
                }
            })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

controller.deleteDivisi = async function (req, res) {
    try {
        const result = await model.divisi.findOne({
            where: { id: req.body.id }
        })
        if (result) {
            await model.divisi.destroy({ where: { id: req.body.id } })
            res.status(200).json({ message: "Divisi successfully deleted" });
        } else {
            res.status(404).json({ message: "Divisi not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = controller