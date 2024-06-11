const express = require("express");
const router = express.Router();
const controllerUser = require("../controllers/userController");
const controllerLogin = require("../controllers/loginController")
const controllerDivisi = require("../controllers/divisiController")
const verifyToken = require("../config/middleware/verifyTokenJwt")
var userConttroler = {}
var loginController = {}
var divisiController = {}
userConttroler.user = controllerUser
loginController.user = controllerLogin
divisiController.divisi = controllerDivisi


//for login
router.get("/login", loginController.user.login)

//for user
router.get("/user", verifyToken, userConttroler.user.getAll);
router.get("/user/:email", verifyToken, userConttroler.user.getemail);
router.post("/user", verifyToken, userConttroler.user.insertUser);
router.put("/user", verifyToken ,userConttroler.user.editUser);
router.delete("/user", verifyToken, userConttroler.user.deleteUser);

router.get("/divisi", verifyToken,divisiController.divisi.getAll)

module.exports = router;