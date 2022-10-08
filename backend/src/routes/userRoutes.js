const express = require('express');
const authUser = require('../controllers/authCrtl');
const registerUser = require('../controllers/registerCtrl');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;
