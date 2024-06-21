const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/userController');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
// router.post('/changePassword', UserController.changePassword);

module.exports = router;