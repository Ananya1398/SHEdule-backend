const { scheduleTasks } = require('../services/scheduleService');

const scheduleActivities = async (req, res) => {
  try {
    const { email, date, tasks } = req.body;

    if (!email || !date || !tasks || !Array.isArray(tasks)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const updatedActivities = await scheduleTasks(email, date, tasks);

    res.status(200).json({
      message: 'Activities scheduled successfully',
      activities: updatedActivities
    });
  } catch (error) {
    console.error('Error scheduling activities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { scheduleActivities };
