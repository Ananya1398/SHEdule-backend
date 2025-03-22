require('dotenv').config();

const { Client } = require('pg');
console.log('DATABASE_URL:', process.env.DATABASE_URL);
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
    await client.query(`SET search_path TO public`);
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
};

module.exports = { client, connectDB };
