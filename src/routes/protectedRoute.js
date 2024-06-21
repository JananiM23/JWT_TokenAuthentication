const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/authMiddlewares');
const deviceController = require('../Controllers/deviceController');
const UserController = require('../Controllers/userController');

router.post('/device', verifyToken.verifyToken, deviceController.deviceFlow);
router.post('/changePassword', verifyToken.verifyToken, UserController.changePassword);

module.exports = router;