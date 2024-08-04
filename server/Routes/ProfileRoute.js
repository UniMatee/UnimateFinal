const router = require('express').Router();

const { authenticateToken } = require('../Middleware/authMiddleware');
const ProfileController = require('../Controllers/ProfileController');

router.get('/profile', authenticateToken, ProfileController.getProfile);
router.put('/profile', authenticateToken, ProfileController.updateProfile);
router.patch('/profile', authenticateToken, ProfileController.patchProfile);

module.exports = router;
