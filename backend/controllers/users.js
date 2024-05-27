const User = require('../models/users');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var functions = {
    registerUser : async (req, res) => {
        try {
            // Extract data from request body
            const { username, email, password } = req.body;
        
            // Check if user with the same username or email already exists
            const existingUser = await User.findOne({
              where: {
                [Op.or]: [{ username }, { email }]
              }
            });
        
            if (existingUser) {
              return res.status(400).json({ error: 'User already exists' });
            }
        
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
        
            // Create the user
            const newUser = await User.create({
              username,
              email,
              password: hashedPassword
            });
        
            res.status(201).json({ message: 'User registered successfully', user: newUser });
          } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal server error' });
          }
    },
    loginUser : async (req, res) => {
        try {
          // Extract data from request body
          const { username, password } = req.body;
      
          // Find user by username
          const user = await User.findOne({ where: { username } });
      
          // Check if user exists
          if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
          }
      
          // Check if password is correct
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
          }
      
          // Generate JWT token
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      
          res.status(200).json({ token });
        } catch (error) {
          console.error('Error logging in user:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
    },
    getUserProfile : async (req, res) => {
        try {
          // Extract user ID from request (assuming it's attached to the request by middleware)
          const userId = req.user.id;
          
            console.log(req.user.id,userId)
          // Find user by ID
          const user = await User.findByPk(userId);
      
          // Check if user exists
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          res.status(200).json({ user });
        } catch (error) {
          console.error('Error fetching user profile:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = functions;

