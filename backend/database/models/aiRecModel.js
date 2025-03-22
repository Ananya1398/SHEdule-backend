const { client } = require('../db');

const addRecommendation = async (data) => {
  const {
    email,
    date,
    phase,
    hormonal_profile,
    mood_energy,
    fun_fact,
    nutrition,
    exercise,
    sleep,
    mental_health
  } = data;

  const query = `
    INSERT INTO public.ai_rec (
      email, date, phase, hormonal_profile, mood_energy, fun_fact, nutrition, exercise, sleep, mental_health
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
  `;

  const values = [
    email, date, phase, hormonal_profile, mood_energy, fun_fact, nutrition, exercise, sleep, mental_health
  ];

  const result = await client.query(query, values);
  return result.rows[0];
};

const getRecommendation = async (email, date) => {
  const query = `
    SELECT * FROM public.ai_rec 
    WHERE email = $1 AND date = $2;
  `;
  const result = await client.query(query, [email, date]);
  return result.rows[0];
};

const getAllRecommendationsByUser = async (email) => {
  const query = `
    SELECT * FROM public.ai_rec 
    WHERE email = $1;
  `;
  const result = await client.query(query, [email]);
  return result.rows;
};

module.exports = { addRecommendation, getRecommendation, getAllRecommendationsByUser };
