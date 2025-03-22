const express = require('express');
const { addUser, getUserByEmail, getAllUsers } = require('../models/userModel');

const router = express.Router();

// Insert user
router.post('/add-user', async (req, res) => {
  try {
    const result = await addUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch user by email
router.get('/get-user/:email', async (req, res) => {
  try {
    const result = await getUserByEmail(req.params.email);
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch all users
router.get('/get-all-users', async (req, res) => {
  try {
    const result = await getAllUsers();
    res.json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
