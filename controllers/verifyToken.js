const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');
const jwtSecret = config.get('jwtSecret');

module.exports = async function(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, jwtSecret);

    req.user = await User.findById(verified._id);
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};
