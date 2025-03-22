const express = require('express');
const { addRecommendation, getRecommendation, getAllRecommendationsByUser } = require('../models/aiRecModel');

const router = express.Router();

// Insert recommendation
router.post('/add-recommendation', async (req, res) => {
  try {
    const result = await addRecommendation(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding recommendation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch recommendation by email and date
router.get('/get-recommendation/:email/:date', async (req, res) => {
  try {
    const { email, date } = req.params;
    const result = await getRecommendation(email, date);
    if (!result) {
      return res.status(404).json({ error: 'Recommendation not found' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch all recommendations for a user
router.get('/get-all-recommendations/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const result = await getAllRecommendationsByUser(email);
    if (!result.length) {
      return res.status(404).json({ error: 'No recommendations found for this user' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
