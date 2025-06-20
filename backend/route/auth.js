const express = require('express');
const router = express.Router();
const { login } = require('../controller/Login_controller');
const { signup } = require('../controller/Signup_controller');

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
