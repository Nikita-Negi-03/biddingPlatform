const Bid = require('../models/bids'); // Adjust path as needed
const Item = require('../models/items'); // Adjust path as needed

var functions ={
    getBidsForItem : async (req, res) => {
        try {
          const { itemId } = req.params;
      
          // Check if the item exists
          const item = await Item.findByPk(itemId);
          if (!item) {
            return res.status(404).send({ error: 'Item not found' });
          }
      
          // Retrieve all bids for the specified item
          const bids = await Bid.findAll({ where: { item_id: itemId } });
      
          res.send(bids);
        } catch (e) {
          res.status(500).send({ error: 'Server error' });
        }
    },
    placeBid : async (req, res) => {
        try {
          const { itemId } = req.params;
          const { bid_amount } = req.body;
          const userId = req.user.id; // Assuming user ID is added to req.user by the authentication middleware
      
          // Check if the item exists
          const item = await Item.findByPk(itemId);
          if (!item) {
            return res.status(404).send({ error: 'Item not found' });
          }
      
          // Validate the bid amount
          if (bid_amount <= item.current_price) {
            return res.status(400).send({ error: 'Bid amount must be higher than the current price' });
          }
      
          // Place the bid
          const bid = await Bid.create({
            item_id: itemId,
            user_id: userId,
            bid_amount
          });
      
          // Update the item's current price
          item.current_price = bid_amount;
          await item.save();
      
          res.status(201).send(bid);
        } catch (error) {
          res.status(500).send({ error: 'Server error' });
        }
    }
}



module.exports = functions;
