const userPosts = require('../db/UserPosts')
const fs = require('fs');
const moment = require('moment');
const path = require('path');


const adduserPosts = async (req, resp,next) => {
    try {
      // Assuming you have the `req.file` object containing the image information
      if (!req.file) {
        // If no image file is provided, return an error response
        return resp.status(400).json({ error: 'No image file provided' });
      }
      let syncuserPosts = { userId: req.user.username, ...req.body };
      syncuserPosts.image = req.file.path.split('\\')[1];
      syncuserPosts.createdAt = moment().unix()
      let newPost = new userPosts(syncuserPosts);
      let result = await newPost.save();
      const {userId, caption ,location,image,likeCount,comments, id = _id , createdAt} = result
      resp.send({userId, caption ,location,image,likeCount,comments, id , createdAt});
    } catch (error) {
      console.error('Error in adduserPosts:', error);
      resp.status(500).json({ error: 'Something went wrong' });
    }
};

const getAllPosts = async (req, resp) => {
  try {
    let result = await userPosts.find().select('userId caption location image likeCount comments _id createdAt');
    
    console.log('result ---------- ..... ',result)
    // Assuming userPosts.find() can throw an error if the database operation fails,
    // you can also handle that error here if needed.

    // const checkFilter = result.filter((i) => i.userId == req.user.username).reverse();
    // console.log('--- get userPostss', req.user.username, checkFilter);
    // const {userId , caption , location , image , likeCount , comments , id = _id , createdAt} = result
    resp.send(result);
  } catch (error) {
    // If any error occurs during the try block, it will be caught here.
    // console.error('Error while getting products:', error.message);
    resp.status(500).send('An error occurred while fetching products.');
  }
};


const deleteuserPosts = async (req, resp) => {
  try {
    console.log('deleteuserPosts -------- _id', req.params.id);
    
    // Retrieve the product from the database to get the image filename or path
    const product = await userPosts.findById(req.params.id);  
    if (!product) {
      return resp.status(404).send('userPosts not found'); // Return a 404 response if the product is not found
    }
    
    // Get the image filename or path from the product
    const imageFilePath = product.imagePath; // Replace 'imagePath' with the actual property that holds the image filename/path

    // Delete the product from the database
    const result = await userPosts.deleteOne({ _id: req.params.id });
    console.log('result delete product--- ', result);

    if (result.acknowledged) {
      // Delete the image from the upload folder
      fs.unlink(imageFilePath, (err) => {
        if (err) {
          console.error('Error deleting the image:', err);
          resp.status(500).send('An error occurred while deleting the product image.');
        } else {
          console.log('Image deleted successfully');
          resp.send('Deleted Successfully');
        }
      });
    } else {
      resp.status(500).send('Something Went Wrong');
    }
  } catch (error) {
    console.error('Error while deleting product:', error.message);
    resp.status(500).send('An error occurred while deleting the product.');
  }
};




module.exports= {adduserPosts,getAllPosts,deleteuserPosts}