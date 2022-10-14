const asyncHandler = require('express-async-handler');
const { Message } = require('../../models');

const getAllMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chat: chatId })
      .populate('sender', 'name pic email')
      .populate('chat');
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
module.exports = getAllMessages;
