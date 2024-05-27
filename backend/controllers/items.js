const Items = require('../models/items');
const { Op } = require('sequelize');

var functions = {
    getAllItems : async(req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; // Current page, default to 1
            const limit = parseInt(req.query.limit) || 10; // Items per page, default to 10
        
            const offset = (page - 1) * limit;
        
            // Fetch items with pagination
            const items = await Items.findAndCountAll({
              offset,
              limit,
            });
        
            // Calculate total pages based on total count and limit
            const totalPages = Math.ceil(items.count / limit);
        
            res.json({
              currentPage: page,
              totalPages,
              totalCount: items.count,
              items: items.rows,
            });
        } catch (error) {
            console.error('Error retrieving items:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getSingleItem : async (req, res) => {
        try {
          const itemId = req.params.id;
      
          // Find the item by its ID
          const item = await Items.findByPk(itemId);
      
          // If item is not found, return 404 Not Found
          if (!item) {
            return res.status(404).json({ error: 'Item not found' });
          }
      
          // If found, return the item
          res.json(item);
        } catch (error) {
          console.error('Error retrieving item:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    createItem : async (req, res) => {
        try {
          // Extract item data from request body
          const { name, description, starting_price, end_time } = req.body;
      
          // Handle image upload (assuming 'image' is the field name for the image)
          const imageUrl = req.file ? req.file.path : null;
      
          // Create the item in the database
          const newItem = await Items.create({
            name,
            description,
            starting_price,
            current_price: starting_price, // Set current_price to starting_price initially
            image_url: imageUrl,
            end_time,
          });
      
          // Return the newly created item
          res.status(201).json(newItem);
        } catch (error) {
          console.error('Error creating item:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    updateItem : async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'description', 'starting_price', 'current_price', 'image_url', 'end_time'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));
      
        if (!isValidOperation) {
          return res.status(400).send({ error: 'Invalid updates!' });
        }
      
        try {
          if (req.file) {
            req.body.image_url = `/uploads/${req.file.filename}`;
          }
      
          const item = await Items.findByPk(req.params.id);
          if (!item) {
            return res.status(404).send({ error: 'Item not found' });
          }
      
          updates.forEach(update => item[update] = req.body[update]);
          await item.save();
          res.send(item);
        } catch (e) {
          res.status(400).send(e);
        }
    },
    deleteItem : async (req, res) => {
        try {
          const item = await Items.findByPk(req.params.id);
      
          if (!item) {
            return res.status(404).send({ error: 'Item not found' });
          }
      
          await item.destroy();
          res.send({ message: 'Item deleted successfully' });
        } catch (e) {
          res.status(500).send({ error: 'Server error' });
        }
    }
}

module.exports = functions;