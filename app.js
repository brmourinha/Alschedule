const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

require('dotenv/config');

const app = express();

connectDB();

//Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Import Routes
const scheduleRoute = require('./routes/schedule');
const userRoute = require('./routes/user');

app.use('/user', userRoute);
app.use('/schedule', scheduleRoute);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;
// Listen to the server
app.listen(PORT);
