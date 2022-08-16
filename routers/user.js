const router = require("express").Router();

router.get("/auth", (req, res) => {
    res.send("hello auth user");
});

module.exports = router;