const jwt = require('jsonwebtoken');
const { User } = require('../models/user');


exports.isAuthenticated = async (req,res,next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized, No token' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'Unauthorized, User not found' });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized, Invalid token' });
  }
};
