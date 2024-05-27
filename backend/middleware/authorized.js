// middleware/authorize.js
const Item = require('../models/items'); // adjust path as needed

const authorize = async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);

    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    console.log("item.userId",item,req.user.id)
    if (item.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Not authorized to update this item' });
    }

    req.item = item;
    next();
  } catch (e) {
    res.status(500).send({ error: 'Server error' });
  }
};

module.exports = authorize;
