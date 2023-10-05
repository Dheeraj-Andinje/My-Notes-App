var jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    //get user from the jwt token and addid to req object
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({ error: "Pleas authenthicate using valid token" })
    }
    try {
        const data = jwt.verify(token, "dog cat cow $");
        req.user = data.user;
        next();
    } catch (error) {
        console.log("err");
        res.status(401).send({ error: "Pleas authenthicate using valid token " })
    }

}


module.exports = fetchuser;