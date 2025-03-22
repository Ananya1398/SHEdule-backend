const express = require('express');
const { addUserActivity, getUserActivity, getAllActivitiesByUser } = require('../models/userActivitiesModel');

const router = express.Router();

// Insert user activity
router.post('/add-user-activity', async (req, res) => {
  try {
    const result = await addUserActivity(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding user activity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch user activity by email and date
router.get('/get-user-activity/:email/:date', async (req, res) => {
  try {
    const { email, date } = req.params;
    const result = await getUserActivity(email, date);
    if (!result) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch all activities for a user
router.get('/get-all-activities/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const result = await getAllActivitiesByUser(email);
    if (!result.length) {
      return res.status(404).json({ error: 'No activities found for this user' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
