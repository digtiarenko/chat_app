const { Chat } = require('../../models');
const asyncHandler = require('express-async-handler');

const renameGroupChatCtrl = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    },
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');

  if (!updatedChat) {
    res.status(404);
    throw new Error('Chat Not Found');
  } else {
    res.status(200).json(updatedChat);
  }
});

module.exports = renameGroupChatCtrl;
