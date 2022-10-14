const express = require('express');
const getAllMessages = require('../controllers/messages/getAllMessageCtrl');
const sendMessage = require('../controllers/messages/sendMessages');
const auth = require('../middleWares/authMiddleware');

const router = express.Router();

router.route('/:chatId').get(auth, getAllMessages);
router.route('/').post(auth, sendMessage);

module.exports = router;
