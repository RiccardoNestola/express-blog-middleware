const generateJWT = require("../utilities/generateJWT");
const users = require("../db/users.json")

function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).send("I campi sono obbligatori");
        return;
    }

    const user = users.find((user) => user.username === username && user.password === password);

    if (!user) {
        res.status(401).send("username e/o password errati");
        return;
    }

    const token = generateJWT(user);

    res.json({ token });

};

module.exports = {
    login
}