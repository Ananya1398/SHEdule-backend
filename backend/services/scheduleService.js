const { client } = require('../database/db');

const scheduleTasks = async (email, date, tasks) => {

  const query = `
    SELECT activities FROM public.user_activities 
    WHERE email = $1 AND date = $2;
  `;

  const result = await client.query(query, [email, date]);
  let activities = result.rows[0]?.activities || new Array(24).fill(null);

  // Helper function to find an available preferred slot. Preferred slots are between 6am to 10am and 7pm to 11pm.
  // 11pm to 6am is sleep time by default
  const findAvailableSlot = (preferredSlots) => {
    for (let slot of preferredSlots) {
      if (!activities[slot]) return slot;
    }

    for (let i = 6; i <= 22; i++) {
      if (!activities[i]) return i;
    }
    return -1; // No available slot
  };

  const PREFERRED_SLOTS = [
    ...[6, 7, 8, 9, 10],
    ...[19, 20, 21, 22]
  ];

  for (const task of tasks) {
    let availableSlot = findAvailableSlot(PREFERRED_SLOTS);

    if (availableSlot !== -1) {
      activities[availableSlot] = task;
    }
  }

  const updateQuery = `
    UPDATE public.user_activities 
    SET activities = $1 
    WHERE email = $2 AND date = $3
    RETURNING *;
  `;

  const updatedResult = await client.query(updateQuery, [activities, email, date]);
  return updatedResult.rows[0].activities;
};

module.exports = { scheduleTasks };
