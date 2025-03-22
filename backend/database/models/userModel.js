const { client } = require('../db');

const addUser = async (data) => {
  const { email, name, dob } = data;

  const query = `
    INSERT INTO public.users (email, name, dob)
    VALUES ($1, $2, $3) RETURNING *;
  `;

  const values = [email, name, dob];
  const result = await client.query(query, values);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const query = `
    SELECT * FROM public.users WHERE email = $1;
  `;
  const result = await client.query(query, [email]);
  return result.rows[0];
};

const getAllUsers = async () => {
  const query = `SELECT * FROM public.users`;
  const result = await client.query(query);
  return result.rows;
};

module.exports = { addUser, getUserByEmail, getAllUsers };
