const { client } = require('../db');

const addUserActivity = async (data) => {
  const { email, date, activities,colorcode } = data;

  const query = `
    INSERT INTO public.user_activities (email, date, activities,colorcode)
    VALUES ($1, $2, $3,$4)
    RETURNING *;
  `;

  const values = [email, date, activities,colorcode];
  const result = await client.query(query, values);
  return result.rows[0];
};

const replaceUserActivity = async (data) => {
  const { email, date, activities , period_date} = data;
  console.log('Email:', email);
  console.log('Date:', date);
  console.log('Activities:', activities);
  console.log('Period Date:', period_date);

    const query = `
        UPDATE public.user_activities
        SET activities = $3,
          period_date = $4
        WHERE email = $1 AND date = $2
        RETURNING *;
    `;

  const values = [email, date, activities, period_date];
  const result = await client.query(query, values);
  return result.rows[0];
};

const updateUserStatus = async (email, date, status) => {
  const query = `
    UPDATE public.user_activities 
    SET status = $3
    WHERE email = $1 AND date = $2
    RETURNING *;
  `;

  const values = [email, date, status];
  const result = await client.query(query, values);
  return result.rows[0];
};

const getUserActivity = async (email, date) => {
  const query = `
    SELECT * FROM public.user_activities
    WHERE email = $1 AND date = $2;
  `;
  const result = await client.query(query, [email, date]);
  return result.rows[0];
};

const getAllActivitiesByUser = async (email) => {
  const query = `
    SELECT * FROM public.user_activities
    WHERE email = $1;
  `;
  const result = await client.query(query, [email]);
  return result.rows;
};

module.exports = { addUserActivity, getUserActivity, getAllActivitiesByUser, replaceUserActivity, updateUserStatus };
