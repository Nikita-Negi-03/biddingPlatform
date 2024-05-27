const express = require('express');
const router = express.Router();
const items = require('../controllers/items');
const authenticate=require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); 
const authorize=require('../middleware/authorized');

router.get('/', items.getAllItems)
router.get('/:id', items.getSingleItem)
router.post('/', authenticate, upload.single('image'), items.createItem)
router.put('/:id', authenticate, authorize, items.updateItem);
router.delete('/:id', authenticate, authorize, items.deleteItem);

module.exports = router;