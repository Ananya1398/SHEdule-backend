const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const userActivityRoutes = require('./routes/userActivitiesRoutes');
const aiRecRoutes = require('./routes/aiRecRoutes');
const { connectDB } = require('./db');

const app = express();

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', userActivityRoutes);
app.use('/api', aiRecRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
