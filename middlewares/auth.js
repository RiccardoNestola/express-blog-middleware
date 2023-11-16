const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const bearerToken = req.header("Authorization");

    if (!bearerToken) {
        res.status(401).send("Token non presente!");
    }

    const token = bearerToken.split(" ")[1];

    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);

    req["user"] = jwtPayload;

    next();
}