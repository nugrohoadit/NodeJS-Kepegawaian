const { Op } = require("sequelize");
const controller = {};
const pegawaiModel = require("../model/pegawaiModel");
const divisiModel = require("../model/divisiModel");
const model = {};
model.pegawai = pegawaiModel;
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
        const pegawaiData = await model.pegawai.findAll({
            where: { id: { [Op.like]: `%${req.params.id}` } }
        });

        if (pegawaiData.length > 0) {
            res.status(200).json({ message: "Connection Successful", data: pegawaiData });
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

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
};

controller.editPegawai = async function (req, res) {
    try {
        const result = await model.pegawai.findOne({ where: { id: req.body.id } });
        if (result) {
            await model.pegawai.update(
                {
                    nama: req.body.nama,
                    alamat: req.body.alamat,
                    no_tlpn: req.body.no_tlpn,
                    jenis_kelamin: req.body.jenis_kelamin,
                    divisi_id: req.body.divisi_id
                },
                {
                    where: { id: req.body.id }
                }
            );
            res.status(200).json({ message: "Pegawai successfully updated" });
        } else {
            res.status(404).json({ message: "Pegawai not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

controller.deletePegawai = async function (req, res) {
    try {
        const result = await model.pegawai.findOne({ where: { id: req.body.id } });
        if (result) {
            await model.pegawai.destroy({ where: { id: req.body.id } });
            res.status(200).json({ message: "Pegawai successfully deleted" });
        } else {
            res.status(404).json({ message: "Pegawai not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = controller;
