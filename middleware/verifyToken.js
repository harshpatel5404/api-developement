const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        var token = authHeader.split(" ")[1];
        // console.log(token);
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {

                res.status(403).json({
                    "msg": "Token is not valid",
                });
            }
            else {
                req.user = user;
                // console.log(user.id);
                next();

            }
        })

    }
    else {
        res.status(401).json({
            "msg": "You are not authenticated!",
            "status": "400"
        });
    }
}

module.exports = verifyToken;