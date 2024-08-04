const router = require('express').Router();

const LostFoundController = require('../Controllers/Lost&FoundController');
const { authenticateToken } = require('../Middleware/authMiddleware');

// Routes
router.post('/create', authenticateToken, LostFoundController.createLostFoundItem);
router.get('/', authenticateToken, LostFoundController.getAllLostFoundItems);

module.exports = router;
