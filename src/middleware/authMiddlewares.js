const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    try {
    const token = req.header('Authorization');
    if(!token) {
        return res.status(401).send({ message: "Access Denied" });
    }

    const decoded = jwt.verify(token, '6bZIP3Jz');
    req.userId = decoded.userId;
    next();
    } catch(err) {
        console.log('Error: Invalid token');
        res.status(401).send({ message: 'Invalid token'});
    }
}