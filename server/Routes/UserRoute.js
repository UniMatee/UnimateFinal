const router = require('express').Router();

const UserController = require('../Controllers/UserController');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/', UserController.getAllUsers);
router.get('/profile', UserController.getUser);

module.exports = router;

