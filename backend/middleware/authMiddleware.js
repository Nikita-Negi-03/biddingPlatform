// const jwt = require('jsonwebtoken');
// const User = require('../models/users') 

// // Middleware function to authenticate user
// const authenticateUser = async (req, res, next) => {
//   try {
//     // Extract token from Authorization header
//     const token = req.headers.authorization.split(' ')[1];

//     // Verify token
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decodedToken)
//     // Attach user ID to request object
//     req.userId = decodedToken.userId;

//     // Proceed to next middleware or route handler
//     next();
//   } catch (error) {
//     console.error('Error authenticating user:', error);
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// };

// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const User = require('../models/users'); // adjust path as needed

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authenticate;


// module.exports = authenticateUser;
