const { Op } = require("sequelize")
const controller = {}
const pegawaiModel = require("../model/pegawaiModel")
const divisiModel = require("../model/divisiModel")
const model = {}
model.pegawai = pegawaiModel
model.divisi = divisiModel;

// Define associations (this should ideally be done in your model definition files)
model.pegawai.belongsTo(model.divisi, { foreignKey: 'divisi_id', as: 'divisi' });
model.divisi.hasMany(model.pegawai, { foreignKey: 'divisi_id', as: 'pegawai' });



controller.getAll = async function (req, res) {
    try {
        const pegawaiData = await model.pegawai.findAll({
            attributes: ['id', 'nama', 'alamat', 'no_tlpn', 'jenis_kelamin'],
            include: [{
                model: model.divisi,
                as: 'divisi',
                attributes: ['divisi']
            }]
        });

        if (pegawaiData.length > 0) {
            res.status(200).json({
                message: "connection successful",
                data: pegawaiData
            });
        } else {
            res.status(200).json({
                message: "Data Empty",
                data: []
            });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


controller.getPegawaiById = async function (req, res) {
    try {
        var pegawaiData = await model.pegawai.findAll({
            where: { id: { [Op.like]: `%${req.params.id}` } }
        })

        if (pegawaiData.length > 0) {
            res.status(200).json({ message: "Connection Successful", data: pegawaiData })
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

controller.insertPegawai = async function (req, res) {
    try {
        await model.pegawai.create({
            nama: req.body.nama,
            alamat: req.body.alamat,
            no_tlpn: req.body.no_tlpn,
            jenis_kelamin: req.body.jenis_kelamin,
            divisi_id: req.body.divisi_id
        });
        res.status(201).json({ message: 'Pegawai successfully created' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


controller.editPegawai = async function (req, res) {
    try {
        await model.pegawai.findAll({ where: req.body.id })
            .then(async (result) => {
                if (result.length > 0) {
                    await model.divisi.update(
                        {
                            nama: req.body.nama,
                            alamat: req.body.alamat,
                            no_tlpn: req.body.no_tlpn,
                            jenis_kelamin: req.body.jenis_kelamin,
                            divisi_id: req.body.divisi_id
                        },
                        {
                            where: { id: req.body.id }
                        })
                } else {
                    res.status(500).json({ message: "update failed" });
                }
            })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

controller.deletePegawai = async function (req, res) {
    try {
        await model.pegawai.findAll({ where: { id: req.body.id } })
            .then(async (result) => {
                if (result.length > 0) {
                    await model.pegawai.destroy({ where: { id: id.req.body } })
                    res.status(200).json({ message: "delete pegawai successfull" })
                } else {
                    res.status(400).json({ message: "pegawai not found" })
                }
            })
    } catch (error) {

    }
}


module.exports = controller