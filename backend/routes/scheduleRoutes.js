const express = require('express');
const { scheduleActivities } = require('../controllers/scheduleController');

const router = express.Router();

router.post('/schedule-activities', scheduleActivities);

module.exports = router;
