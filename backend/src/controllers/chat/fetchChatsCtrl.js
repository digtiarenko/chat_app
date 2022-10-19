const { Chat, User } = require('../../models');
const asyncHandler = require('express-async-handler');

const fetchChatsCtrl = asyncHandler(async (req, res) => {
  try {
    let chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 });

    allChats = await User.populate(chats, {
      path: 'latestMessage.sender',
      select: 'name pic email',
    });
    res.status(200).send(allChats);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = fetchChatsCtrl;
