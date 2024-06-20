const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/authMiddlewares');
const UserController = require('../Controllers/userController');

// router.get('/', verifyToken(), UserController.loginUser);

module.exports = router;