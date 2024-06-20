const jwt = require('jsonwebtoken');
const secret_key = '4xxXKNSH7hp3PKA0WtcU3TZDZNMcAnaD6FoXG39GLGM=';
//  refered site for secret key: https://jwt-keys.21no.de/, algorithm: HS256, Bytes: 32

exports.verifyToken = async (req, res, next) => {
    try {
    const token = req.header('Authorization');
    if(!token) {
        return res.status(401).send({ message: "Access Denied" });
    }

    const decoded = jwt.verify(token, secret_key);
    req.userId = decoded.userId;
    next();
    } catch(err) {
        console.log('Error: Invalid token');
        res.status(401).send({ message: 'Invalid token'});
    }
}