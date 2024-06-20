const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/authMiddlewares');
const deviceController = require('../Controllers/deviceController');

router.post('/device', verifyToken.verifyToken, deviceController.deviceFlow);

module.exports = router;