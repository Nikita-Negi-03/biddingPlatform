const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bids');
const authenticate=require('../middleware/authMiddleware');


router.get('/:itemId/bids', bidController.getBidsForItem);
router.post('/:itemId/bids', authenticate, bidController.placeBid);

module.exports = router;
