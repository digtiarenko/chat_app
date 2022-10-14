const express = require('express');
const authUser = require('../controllers/auth/authCrtl');
const getAllUsers = require('../controllers/getAllUsers');
const registerUser = require('../controllers/auth/registerCtrl');
const auth = require('../middleWares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/', auth, getAllUsers);

module.exports = router;
