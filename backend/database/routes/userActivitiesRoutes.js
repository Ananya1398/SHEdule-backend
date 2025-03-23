const express = require('express');
const { addUserActivity, getUserActivity, getAllActivitiesByUser, replaceUserActivity, updateActivityStatus, getActivityStatus } = require('../models/userActivitiesModel');

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

// update user activity based on ai recommendations
router.put('/replace-user-activity', async (req, res) => {
  try {
    const result = await replaceUserActivity(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error replacing user activity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/update-activity-status', async (req, res) => {
  console.log('PUT request received at /update-user-status');
  try {
    const { email, date, status } = req.body;

    if (!email || !date || !status || !Array.isArray(status) || status.length !== 24) {
      return res.status(400).json({ error: 'Invalid input format' });
    }
    const result = await updateActivityStatus(email, date, status);
    if (!result) {
      return res.status(404).json({ error: 'User activity not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get-activity-status/:email/:date', async (req, res) => {
  try {
    const { email, date } = req.params;

    if (!email || !date) {
      return res.status(400).json({ error: 'Invalid input format' });
    }

    const status = await getActivityStatus(email, date);
    if (status === null) {
      return res.status(404).json({ error: 'No status found for this user and date' });
    }

    res.status(200).json({ status });
  } catch (error) {
    console.error('Error fetching user status:', error);
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
