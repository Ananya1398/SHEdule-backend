const express = require('express');
const cors = require('cors');
const userRoutes = require('./database/routes/userRoutes');
const userActivityRoutes = require('./database/routes/userActivitiesRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');

const { connectDB } = require('./database/db');

const app = express();

app.use(cors()); 

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', userActivityRoutes);
app.use('/api', scheduleRoutes);


app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
