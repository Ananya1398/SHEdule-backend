const { client, connectDB } = require('./db');

const createTables = async () => {
  try {
    await connectDB();

    console.log('Connected to database');

    // Create users table with email as primary key
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.users (
          email VARCHAR(255) PRIMARY KEY,
          dob DATE NOT NULL,
          name VARCHAR(100) NOT NULL
      );
    `);
    console.log('Created table: users');

    // Create user_activities table with email as foreign key
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.user_activities (
          email VARCHAR(255) REFERENCES public.users(email) ON DELETE CASCADE,
          date DATE NOT NULL,
            activities VARCHAR(100)[24] DEFAULT ARRAY[
                'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', 'Sleep', NULL,
                NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
                NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Sleep'
            ],
            status INTEGER[24] DEFAULT ARRAY[
              0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0
          ],
          next_period_date DATE,
          PRIMARY KEY (email, date)
      );
    `);
    console.log('Created table: user_activities');

  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await client.end();
    console.log('Connection closed');
  }
};

//createTables();
