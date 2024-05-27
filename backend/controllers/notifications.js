const Notification = require('../models/notifications');

var functions = {
    getNotifications : async (req, res) => {
        try {
          const userId = req.user.id; // Assuming user ID is added to req.user by the authentication middleware
      
          const notifications = await Notification.findAll({
            where: { user_id: userId }
          });
      
          res.status(200).send(notifications);
        } catch (error) {
          res.status(500).send({ error: 'Server error' });
        }
    },
    markNotificationsAsRead : async (req, res) => {
        try {
          const userId = req.user.id; // Assuming user ID is added to req.user by the authentication middleware
          const { notificationIds } = req.body; // Array of notification IDs to mark as read
      
          if (!notificationIds || !Array.isArray(notificationIds)) {
            return res.status(400).send({ error: 'Invalid input' });
          }
      
          // Update notifications to mark them as read
          await Notification.update(
            { is_read: true },
            {
              where: {
                id: notificationIds,
                user_id: userId
              }
            }
          );
      
          res.status(200).send({ message: 'Notifications marked as read' });
        } catch (error) {
          res.status(500).send({ error: 'Server error' });
        }
      }
}



module.exports = functions;