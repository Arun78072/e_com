const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to authenticate the token
const  authenticateToken =(req, res, next)=> {
  const token1 = req.headers.authorization;
  console.log('token1',req.headers)
  if (!token1) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const token = token1.split(' ')[1]
    const decoded = jwt.verify(token, 'secret_key');
    req.user = decoded; // Attach the authenticated user's information to the request object
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Protected route for adding a product


module.exports = authenticateToken;
