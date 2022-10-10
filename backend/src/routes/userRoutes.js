const express = require('express');
const authUser = require('../controllers/authCrtl');
const getAllUsers = require('../controllers/getAllUsers');
const registerUser = require('../controllers/registerCtrl');
const auth = require('../middleWares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/', auth, getAllUsers);

module.exports = router;
