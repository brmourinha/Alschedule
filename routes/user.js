const express = require('express');
const router = express.Router();
const User = require('../models/User');
const config = require('config');
const jwtSecret = config.get('jwtSecret');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('../controllers/verifyToken');
const {
  registerValidation,
  loginValidation
} = require('../controllers/validation');

// Routes

// Get User
router.get('/auth', verify, async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
});
// Add User
router.post('/register', async (req, res) => {
  // Validate User
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, password, bar } = req.body;
  // Checking if the user is already in the database
  const userExist = await await User.findOne({ name });
  if (userExist) return res.status(400).send('User already Exists');

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = new User({ name, password: hashedPassword, bar });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  // Validate User
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email exists
  const user = await User.findOne({ name: req.body.name }).select('+password');
  if (!user) return res.status(400).send('User does not exist!!');

  // Check Password
  const checkPass = await bcrypt.compare(req.body.password, user.password);
  if (!checkPass) return res.status(400).send('Wrong Password');

  // Create and assing a token
  const token = jwt.sign({ _id: user._id }, jwtSecret, {
    expiresIn: 6000
  });
  res.header('auth-token', token).send(token);
});

module.exports = router;
