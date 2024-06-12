const express = require("express");
const router = express.Router();
const controllerUser = require("../controllers/userController");
const controllerLogin = require("../controllers/loginController")
const controllerDivisi = require("../controllers/divisiController")
const controllerPegawai = require("../controllers/pegawaiController")
const verifyToken = require("../config/middleware/verifyTokenJwt")
var userConttroler = {}
var loginController = {}
var divisiController = {}
var pegawaiController = {}
userConttroler.user = controllerUser
loginController.user = controllerLogin
divisiController.divisi = controllerDivisi
pegawaiController.pegawai = controllerPegawai

//for login
router.post("/login", loginController.user.login)

//for user
router.get("/user", verifyToken, userConttroler.user.getAll);
router.get("/user/:email", verifyToken, userConttroler.user.getemail);
router.post("/user", verifyToken, userConttroler.user.insertUser);
router.put("/user", verifyToken, userConttroler.user.editUser);
router.delete("/user", verifyToken, userConttroler.user.deleteUser);

//for divisi
router.get("/divisi", verifyToken, divisiController.divisi.getAll)
router.get("/divisi/:id", verifyToken, divisiController.divisi.getDivisiById)
router.post("/divisi", verifyToken, divisiController.divisi.insertDivisi)
router.put("/divisi", verifyToken, divisiController.divisi.editDivisi)
router.delete("/divisi", verifyToken, divisiController.divisi.deleteDivisi)

router.get("/pegawai", verifyToken, pegawaiController.pegawai.getAll)
router.get("/pegawai/:id", verifyToken, pegawaiController.pegawai.getPegawaiById)
router.post("/pegawai", verifyToken, pegawaiController.pegawai.insertPegawai)
router.put("/pegawai", verifyToken, pegawaiController.pegawai.editPegawai)
router.delete("/pegawai", verifyToken, pegawaiController.pegawai.deletePegawai)
module.exports = router;