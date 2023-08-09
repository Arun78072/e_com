const express = require('express');
const router = express.Router();
const Auth = require('./controllers/Auth');
// const UserPosts = require('./controllers/UserPosts');
const Posts = require('./controllers/Posts')
const Chat = require('./controllers/Chat');
const {Upload} = require('./services/ImageUpload')
const authenticateToken = require('./controllers/handleToken');
const Users = require('./controllers/Users');

// Login with username and password
router.post('/login', Auth.loginUser);

// Register New User
router.post('/signup', Upload.single('avatar'), Auth.signUp);

// Get User Profile  
// router.get('/get-details',authenticateToken,  Users.getProfile);
router.get('/get-details',authenticateToken, Users.getProfile);

// Apis About Products 
router.post('/create-posts',Upload.single('image'),  authenticateToken, Posts.adduserPosts);

router.get('/get-posts',authenticateToken, Posts.getAllPosts);

router.delete('/delete-product/:id',authenticateToken, Posts.deleteuserPosts);

router.get('/all_users',authenticateToken ,Chat.allUsers);

module.exports = router;