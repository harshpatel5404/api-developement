const User = require("../modules/User");
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
var verifyToken = require('../middleware/verifyToken');
const router = require("express").Router();

router.post("/register", async (req, res) => {
    try {
        let email = await User.findOne({ email: req.body.email });
        let username = await User.findOne({ username: req.body.username });
        if (username) {
            return res.status(400).json({
                "msg": "Username already used!",
                "status": "400"
            });
        }
        else if (email) {
            return res.status(400).json({
                "msg": "Email already used!",
                "status": "400"
            });
        }

        else {
            let user = new User({
                username: req.body.username,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
            });
            let savedUser = await user.save();
            res.status(200).json(savedUser);
        }


    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });


        if (!user) {
            return res.status(400).json({
                "msg": "User not found!",
                "status": "400"
            });
        }
        else {
            var hashedpassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            var DBpassword = hashedpassword.toString(CryptoJS.enc.Utf8);

            if (DBpassword != req.body.password) {
                return res.status(400).json({
                    "msg": "Wrong Credential!",
                    "status": "400"
                });
            }
            else {
                var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
                const { password, ...data } = user._doc;
                return res.status(200).json({ data, token });
            }
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});



router.get("/test", verifyToken, ((req, res) => {
    console.log(req.user.id)
    res.send("Hello wolrd");
}));

module.exports = router;