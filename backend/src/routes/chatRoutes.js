const express = require('express');
const auth = require('../middleWares/authMiddleware');
const {
  createChatCtrl,
  fetchChatsCtrl,
  createGroupChatCtrl,
  renameGroupChatCtrl,
  removeFromGroupChatCtrl,
  addToGroupChatCtrl,
} = require('../controllers/chat');

const router = express.Router();

router.post('/', auth, createChatCtrl);
router.get('/', auth, fetchChatsCtrl);
router.post('/group', auth, createGroupChatCtrl);
router.put('/grouprename', auth, renameGroupChatCtrl);
router.put('/groupremove', auth, removeFromGroupChatCtrl);
router.put('/groupadd', auth, addToGroupChatCtrl);

module.exports = router;
