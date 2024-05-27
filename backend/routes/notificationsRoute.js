const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notifications');
const authenticate =require('../middleware/authMiddleware');

// GET /notifications
router.get('/', authenticate, notificationController.getNotifications);
router.post('/mark-read', authenticate, notificationController.markNotificationsAsRead);

module.exports = router;
