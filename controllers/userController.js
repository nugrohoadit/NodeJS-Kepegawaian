const { Op } = require("sequelize")
const controller = {}
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretkey');

const userModel = require("../model/userModel")
const model = {}
model.user = userModel


controller.getAll = async function (req, res) {
    try {
        const userData = await model.user.findAll()

        if (userData.length > 0) {
            res.status(200).json({
                message: "Connection Successfull",
                data: userData
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

controller.getemail = async function (req, res) {
    try {
        var userData = await model.user.findAll({
            where: { email: { [Op.like]: `%${req.params.email}%` } },
        });
        if (userData.length > 0) {
            res
                .status(200)
                .json({ message: "Connection successful", data: userData });
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.insertUser = async function (req, res) {
    try {
        await model.user
            .create({
                email: req.body.email,
                password: cryptr.encrypt(req.body.password),

            })
            .then((result) => {
                res.status(201).json({
                    message: "user successful created",
                    data: {
                        email: req.body.email,
                        password: cryptr.encrypt(req.body.password),

                    },
                });
            });
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.editUser = async function (req, res) {
    try {
        await model.user
            .findAll({ where: { id: req.body.id } })
            .then(async (result) => {
                if (result.length > 0) {
                    await model.user.update(
                        {
                            email: req.body.email,
                            password: cryptr.encrypt(req.body.password),
                        },
                        { where: { id: req.body.id } }
                    );
                    res.status(200).json({
                        message: "update successful",
                        data: {
                            id: req.body.id,
                            email: req.body.email,
                            password: cryptr.encrypt(req.body.password),
                        },
                    });
                } else {
                    res.status(500).json({ message: "update failed" });
                }
            });
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.deleteUser = async function (req, res) {
    try {
        await model.user
            .findAll({ where: { id: req.body.id } })
            .then(async (result) => {
                if (result.length > 0) {
                    await model.user.destroy({ where: { id: req.body.id } });
                    res.status(200).json({ message: "delete user successfully" });
                } else {
                    res.status(404).json({ message: "id user not found" });
                }
            });
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

module.exports = controller;