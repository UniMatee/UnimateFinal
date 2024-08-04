const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');

const UserRoute = require('./Routes/UserRoute');
const ProfileRoute = require('./Routes/ProfileRoute');
const AnnouncementRoute = require('./Routes/AnnouncementRoute');
const LostFoundRoute = require('./Routes/Lost&FoundRoute');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  serverSelectionTimeoutMS: 30000,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Routes
app.use('/user', UserRoute);
app.use('/profile', ProfileRoute);
app.use('/announcement', AnnouncementRoute);
app.use('/lostfound', LostFoundRoute);

// Error Handling Middleware
app.use((err, res) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 8080; 

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
