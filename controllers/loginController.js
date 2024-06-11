const jwt = require('jsonwebtoken');
const controller = {}
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretkey');
const userModel = require("../model/userModel")
const model = {}
model.user = userModel
require("dotenv").config();

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_TOKEN, {
        expiresIn: '1h',
    });
};

controller.login = async function (req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await model.user.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = cryptr.decrypt(user.password)

        if (isPasswordValid !== password) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        if (user.email !== email) {
            return res.status(401).json({ message: "Invalid Email" })
        }

        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            data : {
                email: email,
                password: password,
                token,
            }
         
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = controller