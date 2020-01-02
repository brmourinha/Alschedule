const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const verify = require('../controllers/verifyToken');

// Routes
// Get all Schedules
router.get('/', verify, async (req, res) => {
  try {
    const schedule = await Schedule.find({ user: req.user });
    res.json(schedule);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get Specific Schedule
router.get('/:scheduleId', verify, async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.scheduleId);
    res.json(schedule);
  } catch (err) {
    res.json({ msg: err });
  }
});

// ADD Schedules
router.post('/', verify, async (req, res) => {
  req.body.user = req.user;

  try {
    const saveSchedule = await Schedule.create(req.body);
    res.status(201).json(saveSchedule);
  } catch (err) {
    err => res.json({ message: err });
  }
});

// Remove Schedule
router.delete('/:scheduleId', verify, async (req, res) => {
  try {
    let schedule = await Schedule.findById(req.params.scheduleId);

    if (!schedule) return res.status(404).json({ msg: 'Schedule not found' });

    // Make sure user owns schedule
    if (schedule.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorize' });
    }
    await schedule.remove();
    res.json({});
  } catch (err) {
    res.json({ msg: err });
  }
});

// Update Schedule
router.put('/:scheduleId', verify, async (req, res) => {
  try {
    let schedule = await Schedule.findById(req.params.scheduleId);

    if (!schedule) return res.status(404).json({ msg: 'Schedule not found' });

    // Make sure user owns schedule
    if (schedule.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorize' });
    }

    await schedule.remove();

    req.body.user = req.user;
    const newSchedule = await Schedule.create(req.body);

    res.json(newSchedule);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
