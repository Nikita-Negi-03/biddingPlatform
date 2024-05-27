const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const authenticate=require('../middleware/authMiddleware');

router.post('/register', users.registerUser);
router.post('/login', users.loginUser)
router.get('/profile', authenticate, users.getUserProfile)

module.exports = router;