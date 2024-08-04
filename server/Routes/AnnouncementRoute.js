const express = require('express');
const router = express.Router();

const { createAnnouncement, getAllAnnouncements } = require('../Controllers/AnnouncementController');
const { authenticateToken } = require('../Middleware/authMiddleware');

router.post('/create', authenticateToken, createAnnouncement);
router.get('/all', getAllAnnouncements);

module.exports = router;
