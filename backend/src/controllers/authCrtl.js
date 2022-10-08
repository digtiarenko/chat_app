const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');
const { User } = require('../models');

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log('authCTRL', email, password);

  const user = await User.findOne({ email }, '-createdAt -updatedAt');

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      //   isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});

module.exports = authUser;
