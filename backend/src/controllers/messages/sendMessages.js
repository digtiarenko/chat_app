const asyncHandler = require('express-async-handler');
const { User } = require('../../models/');
const { Chat } = require('../../models/');
const { Message } = require('../../models');

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  // додати Joi валідацію через мідлвару

  if (!content || !chatId) {
    console.log('Invalid data passed into request');
    return res.status(400);
  }
  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate('sender', 'name pic');
    message = await message.populate('chat');
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'name pic email',
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = sendMessage;
